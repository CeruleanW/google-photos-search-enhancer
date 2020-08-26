import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import MyAppBar from './MyAppBar';
import Photos from './Photos/Photos';
import AccessProvider from './AccessContext';
import UrlsProvider from './UrlsContext';
import Footer from './Footer';
import { Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import SimpleBackdrop from "./Backdrop";
import FeedbackProvider from './FeedbackContext';

const useStyles = makeStyles({
  main: {
    minHeight: '93.5vh',
  },
});

// load gapi
// googleAPI.loadApi();
// instantiate the network request
// show the loading modal
// When connection is successful
// - set state to isConnected
// get all the meta data from Google Photos
// display some recent photos(indicate success)

export default function App() {
  const classes = useStyles();
  return (
    <div>
      <AccessProvider>
        <UrlsProvider>
        <FeedbackProvider>
          <CssBaseline />
          <Box className={classes.main}>
            <MyAppBar />
            <Photos />
            <SimpleBackdrop />
          </Box>
          <Footer />
        </FeedbackProvider>
        </UrlsProvider>
      </AccessProvider>
    </div>
  );
}
