/* global gapi */
import {storeMediaItems, dbPromise} from './IndexedDB';

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
  async function getAllMediaItems(accessToken) {
    let nextToken;
    // fetch a page of data from Google API
    let onePageData = await getAPageOfMediaItems(accessToken);
    nextToken = onePageData.nextPageToken;

    while (nextToken) {
      // use the nextPageToken to get the data in the next page
      nextToken = onePageData.nextPageToken;
      const storingData = onePageData.mediaItems;
      storeMediaItems(storingData, dbPromise);
      onePageData = await getAPageOfMediaItems(accessToken, nextToken);

      // await onePageData
      //   .then(function fulfilled(onePageData) {
      //     nextToken = onePageData.nextPageToken;
      //     storeMediaItems(onePageData.mediaItems, dbPromise);
      //     return nextToken;
      //   })
      //   .then(function fulfilled(nextToken) {
      //     onePageData = getAPageOfMediaItems(nextToken);
      //   });
    }
  }

  // return a Promise wrapping the response JSON
  function getAPageOfMediaItems(accessToken, pageToken) {
    const request = createRequest(accessToken, 'https://photoslibrary.googleapis.com/v1/mediaItems', pageToken);
    const myInit = createFetchInit(accessToken, 'GET');
    return fetch(request, myInit)
      .then((response) => {
        console.log('Fetch is successful');
        return response.json();
      })
      .catch((reject) => {
        console.log('Rejected' + reject);
      });
  }