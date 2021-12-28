import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccessProvider from './components/Context/AccessContext';
import FeedbackProvider from './components/Context/FeedbackContext';
import Footer from './components/atomic/Footer';
import UrlsProvider from './components/Context/UrlsContext';
import Main from './components/Main';

export default function App() {
  return (
    <AccessProvider>
      <UrlsProvider>
        <FeedbackProvider>
          <CssBaseline />
          <Main />
          <Footer />
        </FeedbackProvider>
      </UrlsProvider>
    </AccessProvider>
  );
}
