import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getCachedResource, setCachedResource } from '../utils/indexedDb';

function isNetworkError(error) {
  return !error.response;
}

export default function useIndexedResource({
  resource,
  url,
  initialData,
  transform = (value) => value,
}) {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const transformRef = useRef(transform);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  useEffect(() => {
    let cancelled = false;

    async function readCache() {
      const cached = await getCachedResource(resource);
      if (!cancelled && cached !== undefined) {
        setData(cached);
        setStatus('cached');
      }
    }

    async function readNetwork() {
      try {
        const response = await axios.get(url);
        const payload = transformRef.current(response.data);
        if (!cancelled) {
          setData(payload);
          setStatus('online');
          setError(null);
        }
        await setCachedResource(resource, payload);
      } catch (err) {
        if (cancelled) return;
        if (isNetworkError(err)) {
          setStatus((prev) => (prev === 'cached' ? 'cached' : 'error'));
        } else {
          setStatus('error');
        }
        setError(err);
      }
    }

    readCache();
    readNetwork();

    return () => {
      cancelled = true;
    };
  }, [resource, url, nonce]);

  const setCachedData = (updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setCachedResource(resource, next);
      return next;
    });
  };

  return {
    data,
    status,
    error,
    isOffline: status !== 'online',
    refetch: () => setNonce((value) => value + 1),
    setData: setCachedData,
  };
}

