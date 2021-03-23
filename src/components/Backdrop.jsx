import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFeedback } from './Context/FeedbackContext';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  leftPadding: {
    paddingLeft: '15px',
  }
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  const isBackdropOpened = useFeedback().isBackdropOpened;
  const textMessage = useFeedback().textMessage;

  return (
    <Backdrop className={classes.backdrop} open={isBackdropOpened}>
      <CircularProgress color='inherit' />
      <Typography className={classes.leftPadding}>{textMessage}</Typography>
    </Backdrop>
  );
}
