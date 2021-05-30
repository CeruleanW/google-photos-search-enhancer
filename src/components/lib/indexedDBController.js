import { openDB } from 'idb';
import Fuse from 'fuse.js';

let dbPromise = createDatabase();

export function checkNotFirstVisit() {
  if (!localStorage.noFirstVisit) {
    console.log('first time');
    localStorage.noFirstVisit = '1';
    return false;
  }
  return localStorage.noFirstVisit;
}

export function setTimeStamp(isUpdated = true) {
  if (isUpdated) {
    localStorage.setItem('updateTime', new Date());
  } else {
    localStorage.setItem('updateTime', '');
  }
}

// return a date object or a empty string
export function getTimeStamp() {
  return localStorage.getItem('updateTime');
}

// Create a database with a 'localMediaItems' object store
export function createDatabase() {
  const dbPromise = openDB('db', 1, {
    upgrade(db) {
      db.createObjectStore('localMediaItems', {
        keyPath: 'id',
        autoIncrement: true,
      });
    },
  });
  setTimeStamp();

  return dbPromise;
}

// store an array
export async function storeMediaItems(mediaItems) {
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

export async function clearData() {
  const db = await dbPromise;
  return db.clear('localMediaItems');
}

// search a keyword and return an array of matched Ids(keys)
export async function search(keyword) {
  console.log('Keyword:' + keyword);
  const t0 = performance.now();

  // request data from IndexedDB
  const db = await dbPromise;
  let store = db.transaction('localMediaItems').store;
  let cursor = await store.openCursor();
  // let result = [];

  const t1 = performance.now();
  console.log(`search function took ${t1 - t0} milliseconds.`);
  
  // perform the search

  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ['author', 'tags']
  }
  
  const fuse = new Fuse(cursor, options)
  
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
  const request = await db.getAll('localMediaItems'); // an array of all data objects

  // execute the search
  const options = {
    includeScore: true,
    keys: ['filename', 'description']
  }
  const fuse = new Fuse(request, options)
  const result = fuse.search(keyword);
  // console.log('results: ' + JSON.stringify(result));

  const t1 = performance.now();
  console.log(`search function took ${t1 - t0} milliseconds.`);
  
  return result;
}