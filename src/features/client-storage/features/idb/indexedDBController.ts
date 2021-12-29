import { LocalMediaItem } from './../../../g-api/types';

import { IDBPObjectStore, openDB } from 'idb'; //https://www.npmjs.com/package/idb
import Fuse from 'fuse.js';

const dbName = 'db';
const objectStoreName = 'localMediaItems';

let dbPromise = createDatabase();

// for general IDB usage
async function getDatabase() {
  const db = await openDB(dbName);
  return db;
}

async function getObjectStore(name: string) {
  const db = await getDatabase();
  const store = db.transaction(name).objectStore(name);
  return store;
}

export async function getAllKeys(
  store: IDBPObjectStore
): Promise<IDBValidKey[]> {
  return await store.getAllKeys();
}

// for local media items
export async function getLocalMediaItemsObjectStore() {
  return await getObjectStore(objectStoreName);
}

export async function getAllKeysOfLocalMediaItems() {
  const store = await getLocalMediaItemsObjectStore();
  return await getAllKeys(store);
}

// Create a database with a 'localMediaItems' object store
export function createDatabase() {
  const dbPromise = openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(objectStoreName, {
        keyPath: 'id',
        autoIncrement: true,
      });
    },
  });

  return dbPromise;
}

// store an array
export async function setMediaItems(mediaItems: LocalMediaItem[]) {
  const db = await dbPromise;
  const tx = db.transaction(objectStoreName, 'readwrite');
  mediaItems.forEach((value) => {
    return new Promise((resolve, reject) => {
      resolve(tx.store.put(value));
    }).catch((error) => {
      console.log('Error: failed to store data in IndexedDB' + error);
    });
  });
}

export async function clearData() {
  const db = await dbPromise;
  return db.clear(objectStoreName);
}

export async function searchForItems(keyword) {
  console.log('Keyword:' + keyword);
  const t0 = performance.now();

  // request data from IndexedDB
  const db = await getDatabase();
  const request = await db.getAll(objectStoreName); // an array of all data objects

  // execute the search
  const options = {
    includeScore: true,
    keys: ['filename', 'description'],
  };
  const fuse = new Fuse(request, options);
  const result = fuse.search(keyword);

  const t1 = performance.now();
  console.log(`search function took ${t1 - t0} milliseconds.`);

  return result;
}

export async function getValue(key: string): Promise<any> {
  const db = await getDatabase();
  const tx = db.transaction(objectStoreName, 'readonly');
  const store = tx.objectStore(objectStoreName);
  const val = (await store.get(key)) || null;
  await tx.done;
  return val;
}
