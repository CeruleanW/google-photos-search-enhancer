import AccessProvider from './AccessContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import FeedbackProvider from './FeedbackContext';
import Footer from './Footer';
import UrlsProvider from './UrlsContext';
import React from 'react';
import Main from './Main';

// load gapi
// googleAPI.loadApi();
// instantiate the network request
// show the loading modal
// When connection is successful
// - set state to isConnected
// get all the meta data from Google Photos
// display some recent photos(indicate success)

export default function App() {
  return (
    <div>
      <AccessProvider>
        <UrlsProvider>
          <FeedbackProvider>
            <CssBaseline />
            <Main />
            <Footer />
          </FeedbackProvider>
        </UrlsProvider>
      </AccessProvider>
    </div>
  );
}
