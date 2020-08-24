import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component, useState } from 'react';
import MyAppBar from './MyAppBar';
import * as GapiConnection from './GapiConnection';
import Photos from './Photos/Photos';
import { makeStyles } from "@material-ui/core/";


// load gapi
// googleAPI.loadApi();
// instantiate the network request
// show the loading modal
// When connection is successful
// - set state to isConnected
// get all the meta data from Google Photos
// display some recent photos(indicate success)

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
}))

export default function App(props) {
  const [photoUrls, setPhotoUrls] = useState([]);
  const classes = useStyles();

  const handlePhotos = (baseUrls) => {
    setPhotoUrls(baseUrls);
  };

  return (
    <div>
      <CssBaseline />
      <MyAppBar onPhotos={handlePhotos}/>
      {/* <div className={classes.offset} /> */}
      <Photos photoUrls={photoUrls} ></Photos>
    </div>
  );
}
