import React, { useState, useEffect } from 'react';
import { Title } from './Title';
import MUIAppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import GoogleBtn from './GoogleBtn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchBar from './SearchBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box, Grid, IconButton, Snackbar } from '@material-ui/core';
import clsx from 'clsx';
import { clearData } from '../features/client-storage';
import {
  getTimeStamp,
  setTimeStamp,
  checkNotFirstVisit,
} from '../features/client-storage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { requestAllMediaItems } from '../features/g-api';
import { useAccess } from './Context/AccessContext';
import { useFeedbackUpdate } from './Context/FeedbackContext';
import MuiAlert from '@material-ui/lab/Alert';
import HelpModal from './HelpModal';
import MyDialog from './MyDialog';
import { formatDate } from '../features/date/processor';
import {RandomBtn} from '../features/random/components/RandomBtn';

export function AppBar() {

  // Styles
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    offset: theme.mixins.toolbar,
  }));
  const classes = useStyles();
  const theme = useTheme();
  let justifyStyle;
  useMediaQuery(theme.breakpoints.up('md'))
    ? (justifyStyle = 'flex-end')
    : (justifyStyle = 'center');

  // Context
  const accessToken = useAccess().accessToken;
  const isLogined = useAccess().isLogined;
  const updateFeedback = useFeedbackUpdate();

  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackPack, setSnackPack] = useState([]);
  const [messageInfo, setMessageInfo] = useState('');
  const [severity, setSeverity] = useState(undefined);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [openUpdateAlertDialog, setOpenUpdateAlertDialog] = useState(false);
  const [isUpdateRequestAgreed, setIsUpdateRequestAgreed] = useState(undefined);

  const addSnackPack = (sever, text) => {
    const severity = sever || 'info';
    const message = text || "Don't panic";
    setSnackPack((prev) => [
      ...prev,
      { severity, message, key: new Date().getTime() },
    ]);
  };

  // Update SnackPack
  useEffect(() => {
    if (snackPack?.length) {
      // Set a new snack when we don't have an active one
      setMessageInfo(snackPack[0]?.message);
      setSeverity(snackPack[0]?.severity);
      setSnackPack((prev) => prev.slice(1));
      setIsSnackbarOpen(true);
    } else if (snackPack?.length && messageInfo && isSnackbarOpen) {
      // Close an active snack when a new one is added
      setIsSnackbarOpen(false);
    }
  }, [snackPack, messageInfo, isSnackbarOpen]);

  // Update local data when update request is confrimed
  useEffect(() => {
    if (isUpdateRequestAgreed === true) {
      updateFeedback.handleBackdrop(true);
      updateFeedback.handleTextMessage(
        'Updating local data... Please wait for a while'
      );

      requestAllMediaItems(accessToken)
        .then((fulfilled) => {
          console.log('Update completed!');
          addSnackPack('success', 'Update completed!');
          // Update the LastUpdateView
          setLastUpdateTime(getTimeStamp());
        })
        .finally(() => {
          updateFeedback.handleBackdrop(false);
          updateFeedback.handleTextMessage('');
        });
      setIsUpdateRequestAgreed(undefined);
    }
  }, [isUpdateRequestAgreed, accessToken, updateFeedback]);

  useEffect(() => {
    // If it's the first time
    if (!checkNotFirstVisit()) {
      setIsHelpModalOpen(true);
    }
  }, []);

  const handleClear = () => {
    clearData().then(() => addSnackPack('success', 'Clear completed!'));
    setTimeStamp(false);
    setLastUpdateTime(getTimeStamp());
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleHelpModalClose = () => {
    setIsHelpModalOpen(false);
  };


  return (
    <div>
      <MUIAppBar
        position='sticky'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
        })}
      >
        <Toolbar>
          <Grid container alignItems='center' justifyContent='flex-start' spacing={1}>
            <Grid
              container
              item
              justifyContent='flex-start'
              alignItems='center'
              lg={4}
              md={5}
              xs={12}
            >
              <Title
                setIsDrawerOpen={setIsDrawerOpen}
                clsx={clsx}
                isDrawerOpen={isDrawerOpen}
              />
            </Grid>
            <Grid
              container
              item
              alignItems='center'
              justifyContent='flex-start'
              lg={5}
              md={6}
              xs={12}
            >
              <SearchBar />
              <RandomBtn />
            </Grid>
            <Grid
              container
              item
              alignItems='center'
              justifyContent={justifyStyle}
              xs={12}
              md={1}
              lg={3}
            >
              <GoogleBtn
                onSetLastUpdateTime={() => setLastUpdateTime(getTimeStamp())}
                lastUpdateTime={lastUpdateTime}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </MUIAppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setIsDrawerOpen(false)}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => setOpenUpdateAlertDialog(true)}
            disabled={!isLogined}
          >
            <ListItemText primary='Update data' />
          </ListItem>
          <ListItem button onClick={handleClear} disabled={!lastUpdateTime}>
            <ListItemText primary='Clear data' />
          </ListItem>
          <ListItem
            button
            onClick={() => setIsHelpModalOpen(true)}
            disabled={isHelpModalOpen}
          >
            <ListItemText primary='Help' />
          </ListItem>
        </List>
        <Divider />
        <Typography
          variant='subtitle1'
          display='block'
          gutterBottom
          className={classes.content}
          color='textSecondary'
        >
          <Box>Last Update:</Box>
          {lastUpdateTime ? formatDate(lastUpdateTime) : 'No data'}
        </Typography>
      </Drawer>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={severity}
          elevation={6}
          variant='filled'
        >
          {messageInfo}
        </MuiAlert>
      </Snackbar>
      <HelpModal open={isHelpModalOpen} onClose={handleHelpModalClose} />
      <MyDialog
        open={openUpdateAlertDialog}
        onClose={() => setOpenUpdateAlertDialog(false)}
        onAgreed={(isAgreed) => setIsUpdateRequestAgreed(isAgreed)}
      >
        <Typography color='textPrimary'>
          Depending on the quantity of items in your Google Photos Library, the
          updating time could be up to a few minutes. Are you sure to update?
        </Typography>
      </MyDialog>
    </div>
  );
}
