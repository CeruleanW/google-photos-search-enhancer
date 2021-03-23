import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useFeedback, useFeedbackUpdate } from './Context/FeedbackContext';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '15px',
  },
}));

export default function NoMatchedSnackbar() {
  const classes = useStyles();

  const isNoMatch = useFeedback().isNoMatch;
  const updateIsNoMatch = useFeedbackUpdate().handleIsNoMatch;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      updateIsNoMatch(false);
      return;
    }
    updateIsNoMatch(false);
  };

  function Alert(props) {
    return (
      <MuiAlert elevation={6} variant="filled" onClick={handleClose} {...props}>
        Not Found
      </MuiAlert>);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        open={isNoMatch}
        autoHideDuration={5000}
        onClose={handleClose}
        className={classes.root}
      >
        <Alert severity="warning"></Alert>
      </Snackbar>
    </div>
  );
}