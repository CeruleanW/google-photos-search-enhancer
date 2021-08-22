# Google Photos Search Enhancer

## Intro

Google Photos is powerful for searching in English. However, you can only search some general keywords in other languages, which leads to unpredictable results. cannot search specific text in Chinese within names or descriptions. This app will help you search through the descriptions and filenames in your Google Photos Library in all UTF-8 supported languages.

Website: https://ceruleanw.github.io/google-photos-search-enhancer/

![demo.gif](https://i.imgur.com/5vNyUh5.gif)

## Features

- Data: All data in this application are stored locally. None of them would be uploaded to any server.
- Update: Please click the 'Update' button to get the latest change in your Google Photos Library.
- Edit: Click the photo in the search result, then you can edit it in your Google Photos

## License

The code is available under the [MIT license](LICENSE).

## Credits

- React.js
- Create React App
  - Webpack
  - Babel
- Material UI
- Fuse.js
- [react-masonry-css](https://www.npmjs.com/package/react-masonry-css)
- [react-sticky-footer](https://www.npmjs.com/package/react-sticky-footer)
- [React Google Login](https://www.npmjs.com/package/react-google-login)
- [idb](https://github.com/jakearchibald/idb) - data from your Google Photos account will be stored in IndexedDB



```bash
npm install --save-dev @material-ui/core @material-ui/icons react-google-login idb react-masonry-css react-sticky-footer
```

## What it will do
- sign in your google account and request data from Google Photos
- store the meta data and photo urls in client storage (IndexedDB)
- perform searching on local data

## Others

- There is no metadata in Google Photos API that can state when were the media items updated last time. Therefore, if you edit your media items outside of this APP, you must click 'Update' and get all your media items from Google Photos again.
