import { credentials } from '../auth';

export const GOOGLE_PHOTOS_API = 'https://photoslibrary.googleapis.com/v1';
export const MEDIA_ITEMS_API = `${GOOGLE_PHOTOS_API}/mediaItems`;
export const MEDIA_ITEMS_SEARCH_API = `${MEDIA_ITEMS_API}:search`;

export const oauth2 = {
  clientID: credentials.web.client_id,
  projectId: 'search-chinese-1595873063241',
  authUri: 'https://accounts.google.com/o/oauth2/auth',
  tokenUri: 'https://oauth2.googleapis.com/token',
  scopes: [
    'https://www.googleapis.com/auth/photoslibrary',
    'https://www.googleapis.com/auth/photoslibrary.readonly',
  ],
};