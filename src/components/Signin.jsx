/* eslint-disable */
import React from 'react';
import gLogo from '../images/g-logo.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  gSignin2: {
    
  },
  icon: {
    maxWidth: '32px',
  }
});

export default function Signin() {
  const classes = useStyles();
  
  const signIn = (googleUser) => {
    // get user profile information
    console.log(googleUser.getBasicProfile());
  };

  return (
    <div className={classes.gSignin2} data-onsuccess='onSignIn'>
      <img src={gLogo} className={classes.icon}/>
      Sign in
    </div>
  );
}
