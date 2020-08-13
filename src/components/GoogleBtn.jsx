/* global gapi */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import * as credentials from './credentials.json';
import dbPromise from './IndexedDB';
import * as GapiConnection from './GapiConnection';

const oauth2 = {
  clientID: credentials.web.client_id,
  projectId: 'search-chinese-1595873063241',
  authUri: 'https://accounts.google.com/o/oauth2/auth',
  tokenUri: 'https://oauth2.googleapis.com/token',
  scopes: [
    'https://www.googleapis.com/auth/photoslibrary',
    'https://www.googleapis.com/auth/photoslibrary.readonly',
  ],
};

// const useStyles = makeStyles({
//   gSignin2: {},
//   icon: {
//     maxWidth: '32px',
//   },
// });

export default function GoogleBtn() {
  // const classes = useStyles();
  const [isLogined, setIsLogined] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const login = (response) => {
    if (response.accessToken) {
      setIsLogined(true);
      setAccessToken(response.accessToken);
      handleRequest(response.accessToken);
    }
  };

  const logout = (response) => {
    setIsLogined(false);
    setAccessToken('');
  };
  const handleLoginFailure = (response) => {
    alert('Failed to log in');
  };
  const handleLogoutFailure = (response) => {
    alert('Failed to log out');
  };

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

  async function storeMediaItems(mediaItems, dbPromise) {
    const db = await dbPromise;
    const tx = db.transaction('localMediaItems', 'readwrite');
    mediaItems.forEach((value) => {
      return new Promise((resolve, reject) => {
        resolve(tx.store.put(value));
      }).catch((error) => {
        console.log('Error: failed to store data in IndexedDB' + error);
      });
    });
  }

  // must run after the log-in is completed
  const handleRequest = (accessToken) => {
    console.log('handleRequest is called');
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    const user = GoogleAuth.currentUser.get();

    getAllMediaItems(accessToken);
    // retrieve data from database
  };

  return (
    <React.Fragment>
      {isLogined ? (
        <GoogleLogout
          clientId={oauth2.clientID}
          onLogoutSuccess={logout}
          buttonText='Logout'
          onFailure={handleLogoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={oauth2.clientID}
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
          scope={oauth2.scopes[1]}
          isSignedIn={true}
        />
      )}
    </React.Fragment>
  );
}
