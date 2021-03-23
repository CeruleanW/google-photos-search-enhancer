/* global gapi */
import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import * as credentials from './credentials.json';
import { getTimeStamp } from './IndexedDBController';
import { requestAllMediaItems, setUpdateTime } from './GapiConnection';
import { Button } from '@material-ui/core';
import { useAccessUpdate, useAccess } from './Context/AccessContext';
import { useFeedbackUpdate } from './Context/FeedbackContext';

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

export default function GoogleBtn(props) {
  // const classes = useStyles();
  const updateAccessToken = useAccessUpdate().handleAccessToken;
  const updateBackdrop = useFeedbackUpdate().handleBackdrop;
  const updateTextMessage = useFeedbackUpdate().handleTextMessage;
  const updateIsLogined = useAccessUpdate().handleIsLogined;
  const isLogined = useAccess().isLogined;

  // get the access token from Google
  const login = (response) => {
    if (response.accessToken) {
      updateIsLogined(true);
      updateAccessToken(response.accessToken);
      // start request
      handleRequest(response.accessToken);
    }
  };

  const logout = () => {
    updateIsLogined(false);
    updateAccessToken('');
    // clear search results
  };

  const handleLoginFailure = (response) => {
    alert('Failed to log in');
  };
  const handleLogoutFailure = (response) => {
    alert('Failed to log out');
  };

  // run after the log-in is completed
  const handleRequest = (accessToken) => {
    console.log('handleRequest is called');
    const GoogleAuth = window.gapi.auth2.getAuthInstance();

    // If it's the first time that the user login
    if (!getTimeStamp()) {
      updateTextMessage('Initializing Local Data Storage. This may take long time depends the quantity of media items in your library');
      updateBackdrop(true);
      requestAllMediaItems(accessToken)
        .then((fulfilled) => {
          // Update the LastUpdateView
          props.onSetLastUpdateTime();
        })
        .finally(() => {
          updateBackdrop(false);
          updateTextMessage('');
        });
    } else {
      //TODO: get new items since last update

      setUpdateTime()
        .then(() => {
          props.onSetLastUpdateTime();
        })
        .finally(() => {
          updateBackdrop(false);
          updateTextMessage('');
        });
    }
  };

  return (
    <React.Fragment>
      {isLogined ? (
        <GoogleLogout
          clientId={oauth2.clientID}
          onLogoutSuccess={logout}
          buttonText='Logout'
          onFailure={handleLogoutFailure}
          render={(renderProps) => (
            <Button
              variant='contained'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Logout
            </Button>
          )}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <GoogleLogin
          clientId={oauth2.clientID}
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy='single_host_origin'
          responseType='code,token'
          scope={oauth2.scopes[1]}
          isSignedIn={true}
          render={(renderProps) => (
            <Button
              variant='contained'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login
            </Button>
          )}
        />
      )}
    </React.Fragment>
  );
}
