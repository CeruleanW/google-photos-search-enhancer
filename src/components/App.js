import AccessProvider from './Context/AccessContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import FeedbackProvider from './Context/FeedbackContext';
import Footer from './Footer';
import UrlsProvider from './Context/UrlsContext';
import React from 'react';
import Main from './Main';

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
