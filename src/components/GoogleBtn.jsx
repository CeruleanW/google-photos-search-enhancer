/* global gapi */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import * as credentials from './credentials.json';
import dbPromise from './IndexedDB';

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

  // Set and return the fetch object
  const instantiateFetch = (token, httpMethod, apiURL) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    const myInit = {
      method: httpMethod,
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    };
    const myRequest = new Request(
      `${apiURL}?access_token=${token}&pageSize=100`
    );
    return fetch(myRequest, myInit);
  };

  async function getAllMediaItems(token) {
    let onePageData = getAPageOfMediaItems(token);
    // store the returned data

    while (onePageData.nextPageToken) {
      // use the token to get the data in the next page
      onePageData = getAPageOfMediaItems(onePageData.nextPageToken);
    }
    // return all media items
  }

  // return a Promise wrapping the response
  function getAPageOfMediaItems(token) {
    return instantiateFetch(
      token,
      'GET',
      'https://photoslibrary.googleapis.com/v1/mediaItems'
    ).then((response) => {
      console.log('Fetch is successful');
      return response.json();
    });
  }

  async function storeMediaItems(mediaItems, dbPromise) {
    const db = await dbPromise;
    
    const tx = db.transaction('localMediaItems', 'readwrite');
    const storeAddPromiseArray = mediaItems.map((value) => {
      return new Promise((resolve, reject) => {
        resolve(tx.store.put(value));
      });
    });
    // await Promise.all([...storeAddPromiseArray, tx.done]);
  }

  // must run after the log-in is completed
  const handleRequest = (token) => {
    console.log('handleRequest is called');
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    const user = GoogleAuth.currentUser.get();
    console.log(dbPromise);

    // fetch data from Google API
    let test;
    getAPageOfMediaItems(token).then((response) => {
      console.log(response);
      // put all media items in the database
      storeMediaItems(response.mediaItems, dbPromise);
    });

    console.log('returned test: ' + test);

    // store data to the database 'LocalMediaItems'

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
