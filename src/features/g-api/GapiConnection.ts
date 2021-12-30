// https://developers.google.com/photos/library/guides/access-media-items
import { setMediaItems, setTimeStamp, getTimeStamp } from '../client-storage';
import { sendPost } from '../request';
import { LocalMediaItem } from './types';
import {MEDIA_ITEMS_SEARCH_API, MEDIA_ITEMS_API} from './constants';


// request for all media items and store the result in the IndexedDB
// return the setted time stamp
// Default: include archived items
export async function requestAllMediaItems(
  accessToken?: string,
  url = MEDIA_ITEMS_SEARCH_API,
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
      const storedData = extractPropsInMediaItems(onePageData);
      if (storedData) {
        setMediaItems(storedData);
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
  url = MEDIA_ITEMS_SEARCH_API,
  method = 'POST'
) {
  const processedUrl = accessToken ? `${url}?access_token=${accessToken}` : url;

  const options = {
    filters: { includeArchivedMedia: true },
    pageSize: 100,
    pageToken: pageToken ? pageToken : null,
  };
  console.log('options: ', options);

  const data = await sendPost(processedUrl, options);
  return data;
}


function extractPropsInMediaItems(responseJson): LocalMediaItem[] {
  const mediaItems = responseJson.mediaItems;
  return mediaItems
    ? responseJson.mediaItems.map((mediaItem) => {
        const { id, productUrl, filename, description } = mediaItem;
        return { id, productUrl, filename, description };
      })
    : null;
}
