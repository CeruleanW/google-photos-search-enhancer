import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccessProvider from './components/Context/AccessContext';
import FeedbackProvider from './components/Context/FeedbackContext';
import Footer from './components/atomic/Footer';
import Main from './components/Main';
import { ReduxProvicer } from './providers/redux';

export default function App() {
  return (
    <ReduxProvicer>
      <AccessProvider>
        <FeedbackProvider>
          <CssBaseline />
          <Main />
          <Footer />
        </FeedbackProvider>
      </AccessProvider>
    </ReduxProvicer>
  );
}
