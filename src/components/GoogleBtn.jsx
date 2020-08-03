/* global gapi */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin, GoogleLogout, useGoogleLogout } from 'react-google-login';
import * as credentials from './credentials.json';

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
  const responseGoogle = (response) => {
    console.log(response);
  };

  const login = (response) => {
    if (response.accessToken) {
      setIsLogined(true);
      setAccessToken(response.accessToken);
      request(isLogined);
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

  const request = (signined) => {
    if (signined) {
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      const googleUser = GoogleAuth.currentUser.get();
      const currentScope = googleUser.getGrantedScopes();

      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
      };

      let myRequest = new Request(`https://photoslibrary.googleapis.com/v1/mediaItems?access_token=${accessToken}`);

      fetch(myRequest, myInit).then(function (response) {
        console.log(response);
      });

      // const option = new gapi.auth2.SigninOptionsBuilder();
      // option.setScope('');

      // googleUser.grant(options).then(
      //   function (success) {
      //     console.log(JSON.stringify({ message: 'success', value: success }));
      //   },
      //   function (fail) {
      //     alert(JSON.stringify({ message: 'fail', value: fail }));
      //   }
      // );
    } else {
      console.log('Not Sign-in');
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
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={oauth2.clientID}
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
          scope={oauth2.scopes[1]}
        />
      )}
    </React.Fragment>
  );
}
