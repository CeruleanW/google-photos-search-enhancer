import { openDB } from 'idb';
import Fuse from 'fuse.js';

let dbPromise = createDatabase();

const objectStoreName = 'localMediaItems';

// Create a database with a 'localMediaItems' object store
export function createDatabase() {
  const dbPromise = openDB('db', 1, {
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
export async function storeMediaItems(mediaItems) {
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

// search a keyword and return an array of matched Ids(keys)
export async function search(keyword) {
  console.log('Keyword:' + keyword);
  const t0 = performance.now();

  // request data from IndexedDB
  const db = await dbPromise;
  let store = db.transaction(objectStoreName).store;
  let cursor = await store.openCursor() as any;
  // let result = [];

  const t1 = performance.now();
  console.log(`search function took ${t1 - t0} milliseconds.`);

  // perform the search

  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ['author', 'tags'],
  };

  //ts-ignore
  const fuse = new Fuse(cursor, options);

  const result = fuse.search('tion');
  // loop through each media items
  // while (cursor) {
  //   let des = cursor.value.description;
  //   let fileName = cursor.value.filename;
  //   if (fileName && fileName.includes(keyword)) {
  //     result.push(cursor.key);
  //   } else if (des && des.includes(keyword)) {
  //     result.push(cursor.key);
  //   }
  //   cursor = await cursor.continue();
  // }

  return result;
}

export async function searchForItems(keyword) {
  console.log('Keyword:' + keyword);
  const t0 = performance.now();

  // request data from IndexedDB
  const db = await dbPromise;
  const request = await db.getAll(objectStoreName); // an array of all data objects

  // execute the search
  const options = {
    includeScore: true,
    keys: ['filename', 'description'],
  };
  const fuse = new Fuse(request, options);
  const result = fuse.search(keyword);
  // console.log('results: ' + JSON.stringify(result));

  const t1 = performance.now();
  console.log(`search function took ${t1 - t0} milliseconds.`);

  return result;
}
