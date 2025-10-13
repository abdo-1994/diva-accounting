import axios from 'axios';
import { deleteQueuedRequest, getQueuedRequests, queueRequest } from '../utils/indexedDb';

function isNetworkError(error) {
  return !error.response;
}

export async function sendWithOfflineQueue(config) {
  try {
    const response = await axios(config);
    return { response, queued: false };
  } catch (error) {
    if (!isNetworkError(error)) {
      throw error;
    }

    const queued = await queueRequest(config);
    return { response: null, queued: true, error, queuedRequest: queued };
  }
}

export async function flushOfflineQueue({ onProcessed } = {}) {
  const pending = await getQueuedRequests();
  for (const entry of pending) {
    const { id, createdAt, ...requestConfig } = entry;
    try {
      await axios(requestConfig);
      await deleteQueuedRequest(id);
      onProcessed?.({ id, success: true });
    } catch (error) {
      if (isNetworkError(error)) {
        onProcessed?.({ id, success: false, retry: true });
        break;
      }

      await deleteQueuedRequest(id);
      onProcessed?.({ id, success: false, retry: false, error });
    }
  }
}

export function setupOfflineQueueListeners(callbacks) {
  const handleOnline = () => {
    flushOfflineQueue(callbacks).catch(() => {
      /* swallow */
    });
  };

  window.addEventListener('online', handleOnline);
  // Attempt immediate flush on boot.
  flushOfflineQueue(callbacks).catch(() => {
    /* swallow */
  });

  return () => {
    window.removeEventListener('online', handleOnline);
  };
}

