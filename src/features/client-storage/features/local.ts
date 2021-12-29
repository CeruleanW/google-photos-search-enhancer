
setTimeStamp();


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
    localStorage.setItem('updateTime', String(new Date()));
  } else {
    localStorage.setItem('updateTime', '');
  }
}

// return a date object or a empty string
export function getTimeStamp() {
  return localStorage.getItem('updateTime');
}

export async function setUpdateTime() {
  // get items that not exists in IndexedDB
  setTimeStamp();
  return getTimeStamp();
}