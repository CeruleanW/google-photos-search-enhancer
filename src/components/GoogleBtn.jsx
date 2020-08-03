/* eslint-disable */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin, GoogleLogout, useGoogleLogout } from 'react-google-login';
import * as credentials from './credentials.json';

const PhotosclientID = credentials.web.client_id;
// const PhotosclientSecret = credentials.web.client_secret;


const useStyles = makeStyles({
  gSignin2: {},
  icon: {
    maxWidth: '32px',
  },
});

export default function GoogleBtn() {
  const classes = useStyles();
  const [isLogined, setIsLogined] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const responseGoogle = (response) => {
    console.log(response);
  };

  const login = (response) => {
    if (response.accessToken) {
      setIsLogined(true);
      setAccessToken(response.accessToken);
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

  const request = () => {
    if (isLogined) {
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
    }
  };

  return (
    <React.Fragment>
      {isLogined ? (
        <GoogleLogout
          clientId={PhotosclientID}
          onLogoutSuccess={logout}
          buttonText='Logout'
          onFailure={handleLogoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={PhotosclientID}
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
        />
      )}
    </React.Fragment>
  );
}
