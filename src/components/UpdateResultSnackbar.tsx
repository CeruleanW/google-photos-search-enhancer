import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { SnackbarMessage } from '@/providers/types';

export function UpdateResultSnackbar({
  onClose,
  content,
  ...optionals
}: {
  onClose: () => void;
  content: SnackbarMessage;
  [key: string]: any;
}) {

  const {isOpen, message, severity} = content || {};

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isOpen}
      onClose={onClose}
      autoHideDuration={3000}
    >
      <MuiAlert
        onClose={onClose}
        severity={severity}
        elevation={6}
        variant='filled'
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
