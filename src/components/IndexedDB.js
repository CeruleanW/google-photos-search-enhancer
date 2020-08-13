import { openDB } from 'idb';

export const dbPromise = openDB('db', 1, {
  upgrade(db) {
    db.createObjectStore('localMediaItems', {
      keyPath: 'id',
      autoIncrement: true,
    });
  },
});


export async function storeMediaItems(mediaItems, dbPromise) {
  const db = await dbPromise;
  const tx = db.transaction('localMediaItems', 'readwrite');
  mediaItems.forEach((value) => {
    return new Promise((resolve, reject) => {
      resolve(tx.store.put(value));
    }).catch((error) => {
      console.log('Error: failed to store data in IndexedDB' + error);
    });
  });
}

export default dbPromise;