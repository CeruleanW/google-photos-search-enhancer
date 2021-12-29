import {getAllKeysOfLocalMediaItems, } from '../client-storage';

export const foo = 'foo';


export async function getRandomKeys(n: number = 10) {
  const keys = await getAllKeysOfLocalMediaItems();
  const randomKeys = [];
  for (let i = 0; i < n; i++) {
    const index = getRandomInt(0, keys?.length);
    randomKeys.push(keys[index]);
  }
  return randomKeys;
}

//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}