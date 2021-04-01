/* global gapi */
import {
  storeMediaItems,
  setTimeStamp,
  getTimeStamp,
} from "./indexedDBController";

export const controller = new AbortController();
const signal = controller.signal;

const createBaseInit = (accessToken) => {
  let myHeaders = {};
  Object.assign(myHeaders, { "Content-Type": "application/json" });
  Object.assign(myHeaders, { Authorization: `Bearer ${accessToken}` });

  const baseInit = {
    headers: myHeaders,
    mode: "cors",
    signal,
  };

  return baseInit;
};

// return an init object for Fetch
const createInit = (
  accessToken,
  pageToken,
  httpMethod = "POST",
  filters = { includeArchivedMedia: true },
  pageSize = 100
) => {
  let init = createBaseInit(accessToken);

  // create body
  let body = {
    filters,
    pageSize,
  };
  if (pageToken) {
    Object.assign(body, { pageToken: pageToken });
  }
  body = JSON.stringify(body);

  //assign body
  Object.assign(init, { method: httpMethod, mode: "cors", body });

  return init;
};

const createRequest = (
  apiURL = "https://photoslibrary.googleapis.com/v1/mediaItems",
  queryStrings
) => {
  let url = apiURL;
  if (queryStrings) {
    url += "?" + objectToQueryString(queryStrings);
  }
  return url;
};

const createRequestForSingleItem = (url, accessToken) => {
  return `${url}?access_token=${accessToken}`;
};

const objectToQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
};

// request for all media items and store the result in the IndexedDB
// return the setted time stamp
// Default: include archived items
export async function requestAllMediaItems(
  accessToken,
  url = "https://photoslibrary.googleapis.com/v1/mediaItems:search",
  httpMethod = "POST"
) {
  let nextToken;
  try {
    // fetch a page of data from Google API
    let onePageData = await requestAPageOfMediaItems(
      accessToken,
      false,
      url,
      httpMethod
    );

    do {
      //store data from response
      const storedData = filterResponseData(onePageData);
      if (storedData) {
        storeMediaItems(storedData);
      }

      // use the nextPageToken to get the data in the next page
      nextToken = onePageData.nextPageToken;
      onePageData = await requestAPageOfMediaItems(
        accessToken,
        nextToken,
        url,
        httpMethod
      );
    } while (nextToken);
  } catch (err) {
    console.log(err.name + ": " + err.message);
  }

  setTimeStamp(new Date());
  return getTimeStamp();
}

// return a Promise wrapping the response JSON
async function requestAPageOfMediaItems(
  accessToken,
  pageToken = "",
  url = "https://photoslibrary.googleapis.com/v1/mediaItems:search",
  method = "POST"
) {
  const queryStrings = { access_token: accessToken };
  const request = createRequest(url, queryStrings);
  const options = createInit(accessToken, pageToken, method);
  // const request = "https://photoslibrary.googleapis.com/v1/mediaItems";

  const p = fetch(request, options)
    .then((response) => {
      const json = response.json();
      // console.log("Fetching: " + json);
      return json;
    })
    .catch((error) => console.error(error));

  return p;
}

export async function setUpdateTime() {
  // get items that not exists in IndexedDB
  setTimeStamp(new Date());
  return getTimeStamp();
}

// return a Promise with the fulfilled value
// the value is an array of object, which has 2 property: baseUrl & productUrl
export async function requestForSingleItem(ids, accessToken) {
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

  return await Promise.all(fetches).then((fulfilleds) => {
    const resultUrls = fulfilleds.map((fulfilled) => {
      const baseUrl = fulfilled.baseUrl;
      const productUrl = fulfilled.productUrl;
      return { baseUrl, productUrl };
    });
    return resultUrls;
  });
}

// take a list of base urls, return a list of image blob urls
export async function requestImages(urls, accessToken) {
  let data = [];
  const simpleOptions = createBaseInit(accessToken);
  // fetch each url and push the blob in response to data
  await urls.forEach((url) => {
    fetch(url, simpleOptions)
      .then((response) => {
        const blobResponse = response.blob();
        data.push(blobResponse);
      })
      .catch((error) => console.log(error));
  });

  const urlCreator = window.URL || window.webkitURL;
  const result = data.map((blob) => urlCreator.createObjectURL(blob));

  return result;
}

function filterResponseData(responseJson) {
  const mediaItems = responseJson.mediaItems;
  return mediaItems
    ? responseJson.mediaItems.map((mediaItem) => {
        const { id, productUrl, filename, description } = mediaItem;
        return { id, productUrl, filename, description };
      })
    : null;
}