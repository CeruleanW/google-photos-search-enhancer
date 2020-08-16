import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import GoogleBtn from './GoogleBtn';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Box, Grid } from '@material-ui/core';
import { clearData } from './IndexedDBController';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { storeMediaItems, getTimeStamp } from './IndexedDBController';

export default function MyAppBar() {
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
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
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
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
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const handleClear = () => {
    clearData();
  };

  const getNewLastUpdateTime = () => {
    setLastUpdateTime(getTimeStamp());
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const addZero = (input) => {
      if (input.length < 2) input = '0' + input;
    };
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hours = '' + d.getHours(),
      minutes = '' + d.getMinutes(),
      seconds = '' + d.getSeconds();

    addZero(month);
    addZero(day);
    addZero(hours);
    addZero(minutes);
    addZero(seconds);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isOpen,
        })}
      >
        <Toolbar>
          <Grid
            container
            justify='flex-start'
            alignItems='center'
            direction='row'
          >
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, isOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6'>Google Photos Search Enhancer</Typography>
            <SearchBar />
          </Grid>
          <Grid
            container
            alignItems='center'
            justify='flex-end'
            direction='row'
            lg={2}
            xs={12}
          >
            <GoogleBtn
              onLastUpdateTime={() => setLastUpdateTime(getTimeStamp())}
              lastUpdateTime={lastUpdateTime}
            />
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={isOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary='Update data' />
          </ListItem>
          <ListItem button>
            <ListItemText primary='Clear data' onClick={handleClear} />
          </ListItem>
          <ListItem button>
            <ListItemText primary='Random Sort' />
          </ListItem>
          <ListItem button>
            <ListItemText primary='Stop' />
          </ListItem>
        </List>
        <Box>
          <Typography variant='subtitle1' display='block' gutterBottom>
            Last Update:{' '}
            {lastUpdateTime ? formatDate(lastUpdateTime) : 'No data'}
          </Typography>
        </Box>
      </Drawer>
    </div>
  );
}
