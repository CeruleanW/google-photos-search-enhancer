import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

export default function MyDialog(props) {
  const handleIsAgreed = (bool) => () => {
    props.onAgreed(bool);
    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleIsAgreed(false)}
      aria-describedby='alert-dialog-description'
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {props.children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleIsAgreed(false)} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleIsAgreed(true)} color='primary' autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
