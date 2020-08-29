import React from 'react';
import { Typography, Box as Container } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

export default function HelpModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Container><Typography>Google Photos Search Enhancer</Typography>
      <Typography>
      This app will help you search through the descriptions and filenames in
      your Google Photos Library.
      </Typography>
      <Typography>
      All data from your Google Photos Library are stored locally.
      </Typography></Container>
    </Modal>
  );
}
