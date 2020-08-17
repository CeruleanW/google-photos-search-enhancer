/* global gapi */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import * as credentials from './credentials.json';
import { getTimeStamp } from './IndexedDBController';
import { requestAllMediaItems, requestNewMediaItems } from './GapiConnection';
import { Button } from '@material-ui/core';

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

export default function GoogleBtn(props) {
  // const classes = useStyles();
  const [isLogined, setIsLogined] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  

  const login = (response) => {
    if (response.accessToken) {
      setIsLogined(true);
      setAccessToken(response.accessToken);
      // start request
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

  // must run after the log-in is completed
  const handleRequest = (accessToken) => {
    console.log('handleRequest is called');
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    const user = GoogleAuth.currentUser.get();

    // If the user login, and IndexedDB has no data currently
    // getAPageOfMediaItems(accessToken);
    if (!getTimeStamp()) {
      requestAllMediaItems(accessToken).then((fulfilled) => {
        // Update the LastUpdateView
        props.onLastUpdateTime();
      });
    }
    else {
      requestNewMediaItems(accessToken).then((fulfilled) => {
        props.onLastUpdateTime();
      });
    }
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
          render={renderProps => (
            <Button variant='contained' onClick={renderProps.onClick} disabled={renderProps.disabled} >Logout</Button>
          )}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <GoogleLogin
          clientId={oauth2.clientID}
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
          scope={oauth2.scopes[1]}
          isSignedIn={true}
          render={renderProps => (
            <Button variant='contained' onClick={renderProps.onClick} disabled={renderProps.disabled} >Login</Button>
          )}
        />
      )}
    </React.Fragment>
  );
}
