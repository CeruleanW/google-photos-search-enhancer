import React from 'react';
import MyAppBar from './MyAppBar';
import Photos from './Photos';
import SimpleBackdrop from './Backdrop';
import { Box, LinearProgress } from '@material-ui/core/';
import { useFeedback } from './Context/FeedbackContext';
import { makeStyles } from '@material-ui/core/styles';
import { useUrl } from './Context/UrlsContext';
import icon from '../images/icons8-search-500.png';
import NoMatchedSnackbar from './NoMatchedSnackbar';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '94vh',
  },
  centerText: {
    color: '#2d72bc',
    textDecoration: 'none',
    fontWeight: '800',
    fontFamily: 'Nunito, Helvetica, Arial, sans-serif',
    fontSize: '2em',
  },
  centerLayout: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',

    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    maxWidth: '500px',
    maxHeight: '500px',
    width: '40%',
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
  },
}));

const CenterBackground = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.centerText + ' ' + classes.centerLayout}>
      <img src={icon} alt='search-icon' className={classes.image} />
    </div>
  );
};

export default function Main() {
  const classes = useStyles();

  const isSearching = useFeedback().isSearching;
  const ids = useUrl().searchedIds;

  return (
    <Box className={classes.main}>
      <MyAppBar />
      {ids && ids.length ? <Photos ids={ids} /> : <CenterBackground />}
      <NoMatchedSnackbar />
      <SimpleBackdrop />
      {isSearching ? <LinearProgress /> : null}
    </Box>
  );
}