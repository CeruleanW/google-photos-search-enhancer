import React from 'react';
import {
  Dialog as MUIDialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

export default function MyDialog({open, children, onAgreed, onClose, ...optionals}) {

  const handleIsAgreed = (bool) => () => {
    onAgreed(bool);
    onClose();
  };

  return (
    <MUIDialog
      open={open}
      onClose={handleIsAgreed(false)}
      aria-describedby='alert-dialog-description'
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {children}
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
    </MUIDialog>
  );
}
