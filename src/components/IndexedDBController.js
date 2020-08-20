import { openDB } from 'idb';
import React from 'react';

let dbPromise;
createDatabase();

export function setTimeStamp(value = true) {
  if (value) {
    localStorage.setItem('updateTime', new Date());
  }
  else {
    localStorage.setItem('updateTime', '');
  }
}
// return a date object or a empty string
export function getTimeStamp() {
  return localStorage.getItem('updateTime');
}

// Create a database with a 'localMediaItems' object store
export function createDatabase() {
  dbPromise = openDB('db', 1, {
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
  db.clear('localMediaItems');
}


export function storeGridImages(baseUrl) {

}

// search a keyword and return an array of matched Ids(keys)
export async function search(keyword) {
    console.log('Keyword:' + keyword);

    // request data from IndexedDB
    const db = await dbPromise;
    let store = db.transaction('localMediaItems').store;
    let cursor = await store.openCursor();
    let result = [];

    // loop through each media items
    while (cursor) {
      let des = cursor.value.description;
      if (des && des.includes(keyword)) {
        result.push(cursor.key);
      }
      cursor = await cursor.continue();
    }
    // if (result.length === 0) {
    //   return null;
    // }
    return result;
}

export default function IndexedDB() {}
