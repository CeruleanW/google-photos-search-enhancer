import { openDB } from 'idb';

const dbPromise = openDB('db', 1, {
  upgrade(db) {
    db.createObjectStore('localMediaItems', {
      keyPath: 'id',
      autoIncrement: true,
    });
  },
});


export default dbPromise;