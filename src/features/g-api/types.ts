export type LocalMediaItem = {
  id: string;
  filename: string;
  productUrl: string;
  description?: string;
  [x: string]: any;
};

// returned from api call
export type MediaItem = {
  id: string;
  description: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata: any;
  contributorInfo: any;
  filename: string;
};


export type MediaItemsRequestBody = {
  filters: any;
  pageSize: number;
}