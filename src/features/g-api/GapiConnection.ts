/* global gapi */
// https://developers.google.com/photos/library/guides/access-media-items
import { storeMediaItems, setTimeStamp, getTimeStamp } from '../client-storage';
import { createBaseInit } from '../auth';
import { converObjectToQueryString, fetchData, sendPost} from '../request';

// return an init object for Fetch
function createInit(
  accessToken,
  pageToken,
  httpMethod = 'POST',
  filters = { includeArchivedMedia: true },
  pageSize = 100
) {
  let init = createBaseInit(accessToken);

  // create body
  let body = {
    filters,
    pageSize,
  };
  if (pageToken) {
    Object.assign(body, { pageToken: pageToken });
  }
  const bodyString = JSON.stringify(body);

  //assign body
  Object.assign(init, { method: httpMethod, mode: 'cors', body: bodyString });

  return init;
}

function createRequest(
  apiURL = 'https://photoslibrary.googleapis.com/v1/mediaItems',
  queryStrings
) {
  let url = apiURL;
  if (queryStrings) {
    url += '?' + converObjectToQueryString(queryStrings);
  }
  return url;
}

function createSingleItemUrl(url, accessToken) {
  return `${url}?access_token=${accessToken}`;
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
  try {
    // fetch a page of data from Google API
    let onePageData = await requestAPageOfMediaItems(
      accessToken,
      null,
      url,
      httpMethod
    );
    console.table('onePageData: ', onePageData);

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
    console.log(err.name + ': ' + err.message);
  }

  setTimeStamp();
  return getTimeStamp();
}

// return a Promise wrapping the response JSON
async function requestAPageOfMediaItems(
  accessToken,
  pageToken = '',
  url = 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
  method = 'POST'
) {
  const processedUrl = accessToken ? `${url}?access_token=${accessToken}` : url;

  // const options = createInit(accessToken, pageToken, method);
  const options = {
    filters: { includeArchivedMedia: true },
    pageSize: 100,
    pageToken: pageToken ? pageToken : null,
  };
  console.log('options: ', options);
  // const request = "https://photoslibrary.googleapis.com/v1/mediaItems";

  const data = await sendPost(processedUrl, options);
  // const p = fetch(processedUrl, options)
  //   .then((response) => {
  //     const json = response.json();
  //     // console.log("Fetching: " + json);
  //     return json;
  //   })
  //   .catch((error) => console.error(error));

  return data;
}

export async function setUpdateTime() {
  // get items that not exists in IndexedDB
  setTimeStamp();
  return getTimeStamp();
}

// return a Promise with the fulfilled value
// the value is an array of object, which has 2 property: baseUrl & productUrl
export async function requestForSingleItem(
  ids: string[],
  accessToken: string
): Promise<{ baseUrl: string; productUrl: string }[]> {
  // set a list of requests
  const urls = ids.map(
    (id) => `https://photoslibrary.googleapis.com/v1/mediaItems/${id}`
  );
  const requests = urls.map((url) => createSingleItemUrl(url, accessToken));
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

function filterResponseData(responseJson) {
  const mediaItems = responseJson.mediaItems;
  return mediaItems
    ? responseJson.mediaItems.map((mediaItem) => {
        const { id, productUrl, filename, description } = mediaItem;
        return { id, productUrl, filename, description };
      })
    : null;
}
