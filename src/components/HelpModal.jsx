import React from 'react';
import { Typography, Box, Container, Divider } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: theme.spacing(15),
    padding: theme.spacing(2),
    maxWidth: '90%',
    backgroundColor: 'white',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '70%',
    },
  },
  title: {
    padding: theme.spacing(1),
  },
  firstPara: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
  body: {
    padding: theme.spacing(1),
  },
  footNote: {
    marginTop: theme.spacing(1),
  }
}));

export default function HelpModal(props) {
  const classes = useStyles();
  const BodyPara = (props) => {
    return (
      <Typography color='textSecondary' className={classes.body + ' ' + props.className} align={props.align}>
        {props.children}
      </Typography>
    );
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Container className={classes.root}>
        <Box>
          <Typography
            color='textPrimary'
            variant='h4'
            className={classes.title}
          >
            Google Photos Search Enhancer
          </Typography>
          <Divider />
          <Box>
            <Typography color='textSecondary' className={classes.firstPara}>
              This app will help you search through the descriptions and
              filenames in your Google Photos Library.
            </Typography>
            <ul>
              <li>
                <BodyPara>
                  <strong>Data:</strong> All data in this application are stored locally. None of
                  them would be uploaded to any server.
                </BodyPara>
              </li>
              <li>
                <BodyPara>
                  <strong>Update:</strong> Please click the 'Update' button to get the latest
                  change in your Google Photos Library.
                </BodyPara>
              </li>
              <li>
                <BodyPara>
                  <strong>Edit:</strong> Click the photo in the search result, then you can edit
                  it in your Google Photos
                </BodyPara>
              </li>
            </ul>
          </Box>
          <Divider/>
          <BodyPara align='right' className={classes.footNote}>For further help, please send email to yangyi621#outlook.com &#40;replace # by @&#41;</BodyPara>
        </Box>
      </Container>
    </Modal>
  );
}
