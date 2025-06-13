const DB_NAME = 'qwerty-db';
const DB_VERSION = 1;
const STORE_NAME = 'stories';

function getDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

export async function saveStory(story) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).put(story);
  return tx.complete;
}

export async function getAllStories() {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  return tx.objectStore(STORE_NAME).getAll();
}

export async function deleteStory(id) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).delete(id);
  return tx.complete;
}
