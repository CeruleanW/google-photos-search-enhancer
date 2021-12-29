import { MEDIA_ITEMS_API } from './../g-api/constants';
import { LocalUrls } from './types';
import { fetchData } from '@/features/request';

// return a Promise with the fulfilled value
// the value is an array of object, which has 2 property: baseUrl & productUrl
export async function requestMediaItemsByIds(
  ids: string[],
  accessToken?: string
): Promise<LocalUrls[]> {
  // set a list of requests
  const urls = ids.map((id) => `${MEDIA_ITEMS_API}/${id}`);

  const processedUrls = accessToken
    ? urls.map((url) => `${url}?access_token=${accessToken}`)
    : urls;

  const fetches = processedUrls.map(
    (request) => fetchData(request)
  );

  return await Promise.all(fetches).then((fulfilleds) => {
    const resultUrls = fulfilleds.map((fulfilled) => {
      const { baseUrl, productUrl } = fulfilled || {};
      return { baseUrl, productUrl };
    });
    return resultUrls;
  });
}
