import { openDB } from 'idb';

const DB_NAME = 'diva-accounting-offline';
const DB_VERSION = 1;
const RESOURCE_STORE = 'resources';
const QUEUE_STORE = 'queue';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(RESOURCE_STORE)) {
      db.createObjectStore(RESOURCE_STORE);
    }
    if (!db.objectStoreNames.contains(QUEUE_STORE)) {
      const store = db.createObjectStore(QUEUE_STORE, { keyPath: 'id', autoIncrement: true });
      store.createIndex('byCreatedAt', 'createdAt');
    }
  },
});

export async function getCachedResource(key) {
  const db = await dbPromise;
  const entry = await db.get(RESOURCE_STORE, key);
  return entry?.value;
}

export async function setCachedResource(key, value) {
  const db = await dbPromise;
  return db.put(RESOURCE_STORE, { value, timestamp: Date.now() }, key);
}

export async function clearCachedResource(key) {
  const db = await dbPromise;
  return db.delete(RESOURCE_STORE, key);
}

export async function queueRequest(config) {
  const db = await dbPromise;
  const payload = {
    ...config,
    createdAt: Date.now(),
  };
  const id = await db.add(QUEUE_STORE, payload);
  return { id, ...payload };
}

export async function getQueuedRequests() {
  const db = await dbPromise;
  const tx = db.transaction(QUEUE_STORE, 'readonly');
  const store = tx.store;
  const all = await store.getAll();
  await tx.done;
  return all.sort((a, b) => a.createdAt - b.createdAt);
}

export async function deleteQueuedRequest(id) {
  const db = await dbPromise;
  return db.delete(QUEUE_STORE, id);
}

export async function resetQueue() {
  const db = await dbPromise;
  const tx = db.transaction(QUEUE_STORE, 'readwrite');
  await tx.store.clear();
  await tx.done;
}

