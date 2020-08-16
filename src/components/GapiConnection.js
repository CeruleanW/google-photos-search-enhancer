/* global gapi */
import { storeMediaItems, setTimeStamp, getTimeStamp } from './IndexedDBController';

// return an init object for Fetch
const createFetchInit = (accessToken, httpMethod) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${accessToken}`);
  const myInit = {
    method: httpMethod,
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  };

  return myInit;
};

const createRequest = (accessToken, apiURL, pageToken) => {
  let url;
  if (pageToken) {
    url = `${apiURL}?access_token=${accessToken}&pageSize=100&pageToken=${pageToken}`;
  } else {
    url = `${apiURL}?access_token=${accessToken}&pageSize=100`;
  }
  return new Request(url);
};

// request for all media items and store the result in the IndexedDB
// return the setted time stamp
export async function requestAllMediaItems(accessToken) {
  let nextToken;
  // fetch a page of data from Google API
  let onePageData = await requestAPageOfMediaItems(accessToken);
  nextToken = onePageData.nextPageToken;

  while (nextToken) {
    // use the nextPageToken to get the data in the next page
    nextToken = onePageData.nextPageToken;
    const storingData = onePageData.mediaItems;
    storeMediaItems(storingData);
    onePageData = await requestAPageOfMediaItems(accessToken, nextToken);
  }

  setTimeStamp(new Date());
  return getTimeStamp();
}

// return a Promise wrapping the response JSON
export async function requestAPageOfMediaItems(accessToken, pageToken) {
  const request = createRequest(
    accessToken,
    'https://photoslibrary.googleapis.com/v1/mediaItems',
    pageToken
  );
  const myInit = createFetchInit(accessToken, 'GET');
  return fetch(request, myInit)
    .then((response) => {
      const data = response.json();
      console.log('Fetch data:' + data);
      return data;
    })
    .catch((reject) => {
      console.log('Rejected' + reject);
    });
}

export async function requestNewMediaItems(accessToken) {
  setTimeStamp(new Date());
  return getTimeStamp();
}
