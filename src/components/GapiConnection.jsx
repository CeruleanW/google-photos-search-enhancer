/* global gapi */
import {
  storeMediaItems,
  setTimeStamp,
  getTimeStamp,
} from './IndexedDBController';
import React, { useState } from 'react';

// return an init object for Fetch
const createInit = (
  accessToken,
  pageToken,
  httpMethod = 'POST',
  filters = { includeArchivedMedia: true },
  pageSize = 100
) => {
  let myHeaders = {};
  Object.assign(myHeaders, { 'Content-Type': 'application/json' });
  Object.assign(myHeaders, { Authorization: `Bearer ${accessToken}` });

  let body = {
    filters,
    pageSize,
  };

  if (pageToken) {
    Object.assign(body, { pageToken: pageToken });
  }

  body = JSON.stringify(body);

  const myInit = {
    method: httpMethod,
    headers: myHeaders,
    mode: 'cors',
    body,
  };

  return myInit;
};

const createRequest = (
  apiURL = 'https://photoslibrary.googleapis.com/v1/mediaItems',
  queryStrings
) => {
  let url = apiURL;
  if (queryStrings) {
    url += '?' + objectToQueryString(queryStrings);
  }
  return url;
};

const createRequestForSingleItem = (url, accessToken) => {
  return `${url}?access_token=${accessToken}`;
};

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}

// request for all media items and store the result in the IndexedDB
// return the setted time stamp
// Default: include archived items
export async function requestAllMediaItems(
  accessToken,
  url = 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
  httpMethod = 'POST'
) {
  let nextToken;
  // fetch a page of data from Google API
  let onePageData = await requestAPageOfMediaItems(
    accessToken,
    false,
    url,
    httpMethod
  );
  nextToken = onePageData.nextPageToken;

  while (nextToken) {
    // use the nextPageToken to get the data in the next page
    nextToken = onePageData.nextPageToken;
    const storingData = onePageData.mediaItems;
    storeMediaItems(storingData);
    onePageData = await requestAPageOfMediaItems(
      accessToken,
      nextToken,
      url,
      httpMethod
    );
  }

  setTimeStamp(new Date());
  return getTimeStamp();
}

// return a Promise wrapping the response JSON
async function requestAPageOfMediaItems(
  accessToken,
  pageToken = '',
  url = 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
  method = 'GET'
) {
  const queryStrings = { access_token: accessToken };
  const request = createRequest(url, queryStrings);
  const options = createInit(accessToken, pageToken, method);
  return fetch(request, options)
    .then((response) => {
      const json = response.json();
      console.log('Fetching: ' + json);
      return json;
    })
    .catch((reject) => {
      console.log('Error: ' + reject);
    });
}

export async function requestNewMediaItems(accessToken) {
  // get items that not exists in IndexedDB
  setTimeStamp(new Date());
  return getTimeStamp();
}

// return a Promise with the fulfilled value is an array of baseUrls
export async function requestForBaseUrls(ids, accessToken) {
  // set a list of requests
  const urls = ids.map(
    (id) => `https://photoslibrary.googleapis.com/v1/mediaItems/${id}`
  );
  const requests = urls.map((url) =>
    createRequestForSingleItem(url, accessToken)
  );
  const fetches = requests.map((request) =>
    fetch(request).then((fulfilled) => fulfilled.json())
  );
  // send request and get baseUrls
  return await Promise.all(fetches).then((fulfilleds) => {
    return fulfilleds.map((fulfilled) => fulfilled.baseUrl);
  });
}

// return a list of blobs
export async function requestImages(urls) {
  let data = [];
  // fetch each url and push the blob in response to data
  await urls.forEach((url) => {
    fetch(url)
      .then((response) => {
        response.blob();
      })
      .then((blobResponse) => {
        data.push(blobResponse);
      });
  });

  const urlCreator = window.URL || window.webkitURL;
  const result = data.map((blob) => urlCreator.createObjectURL(blob));

  return result;
}

export default function GapiConnection(props) {
  return;
}
