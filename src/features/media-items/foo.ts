import { MEDIA_ITEMS_API } from './../g-api/constants';
import {LocalUrls} from './types';

// return a Promise with the fulfilled value
// the value is an array of object, which has 2 property: baseUrl & productUrl
export async function requestMediaItemsByIds(
  ids: string[],
  accessToken: string
): Promise<LocalUrls[]> {
  // set a list of requests
  const urls = ids.map((id) => `${MEDIA_ITEMS_API}/${id}`);

  const requests = urls.map((url) => `${url}?access_token=${accessToken}`);

  const fetches = requests.map((request) =>
    fetch(request).then((fulfilled) => fulfilled.json())
  );

  return await Promise.all(fetches).then((fulfilleds) => {
    const resultUrls = fulfilleds.map((fulfilled) => {
      const {baseUrl, productUrl} = fulfilled || {}
      return { baseUrl, productUrl };
    });
    return resultUrls;
  });
}
