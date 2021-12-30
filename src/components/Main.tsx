import React, { useState } from 'react';
import { AppBar } from './AppBar';
import PhotosContainer from './Photos';
import { UpdateLocalDataBackDrop } from './UpdateLocalDataBackDrop';
import { Box, LinearProgress } from '@material-ui/core/';
import { useFeedback } from './Context/FeedbackContext';
import { makeStyles } from '@material-ui/core/styles';
import NoMatchedSnackbar from './NoMatchedSnackbar';
import { CenterBackground } from './CenterBackground';
import { isFilledArray } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { selectDisplayedPhotos } from '../providers/redux/photosSlice';
import { selectSnackbar, resetSnackbar } from '../providers/redux/globalSlice';
import { UpdateResultSnackbar } from './UpdateResultSnackbar';
import { Drawer } from './Drawer';
import styled from 'styled-components';

// @ts-ignore
export const useStyles = makeStyles((theme) => ({
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

const StyledMain = styled.main`
  display: flex;
`;

const FlexColContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export default function Main() {
  const classes = useStyles() as any;
  const dispatch = useDispatch();


  const isSearching = useFeedback().isSearching;
  const displayedPhotos = useSelector(selectDisplayedPhotos);
  const snackbar = useSelector(selectSnackbar);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const handleSnackbarClose = () => {
    dispatch(resetSnackbar());
  };

  return (
    <Box className={classes.main}>
      <Drawer show={isDrawerOpen} onHide={() => setIsDrawerOpen(false)} />
      <AppBar onOpenDrawer={setIsDrawerOpen} />
      {isFilledArray(displayedPhotos) ? <PhotosContainer list={displayedPhotos} /> : <CenterBackground />}
      <NoMatchedSnackbar />
      <UpdateLocalDataBackDrop />
      {isSearching ? <LinearProgress /> : null}
      <UpdateResultSnackbar content={snackbar} onClose={handleSnackbarClose}></UpdateResultSnackbar>
    </Box>
  );
}
