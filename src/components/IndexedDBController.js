import { openDB } from 'idb';
import React from 'react';

let dbPromise;
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
  localStorage.setItem('updateTime', new Date());

  return dbPromise;
}

export async function getDatabase() {
  const db = await dbPromise;
  return db;
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

export function setTimeStamp() {
  localStorage.setItem('updateTime', new Date());
}

export function getTimeStamp() {
  return new Date(localStorage.getItem('updateTime'));
}
// get specific data

// search and return

export default function IndexedDB() {}
