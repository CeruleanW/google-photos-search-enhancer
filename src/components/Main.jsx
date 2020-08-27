import React from 'react';
import MyAppBar from './MyAppBar';
import Photos from './Photos/Photos';
import SimpleBackdrop from './Backdrop';
import { Box, LinearProgress } from '@material-ui/core/';
import { useFeedback } from './FeedbackContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    minHeight: '93.5vh',
  },
  linearProgress: {
    width: '90%',
    height: '6px',
    position: 'fixed',
    bottom: '65px',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
  },
});

export default function Main() {
  const classes = useStyles();
  const isSearching = useFeedback().isSearching;

  return (
    <Box className={classes.main}>
      <MyAppBar />
      <Photos />
      <SimpleBackdrop />
      {isSearching ? (
        <LinearProgress className={classes.linearProgress} />
      ) : null}
    </Box>
  );
}
