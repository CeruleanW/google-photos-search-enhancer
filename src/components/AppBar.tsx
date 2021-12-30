import { Grid } from '@material-ui/core';
import MUIAppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import {
  checkNotFirstVisit, getTimeStamp
} from '../features/client-storage';
import { RandomBtn } from '../features/random/components/RandomBtn';
import GoogleBtn from './GoogleBtn';
import HelpModal from './HelpModal';
import SearchBar from './SearchBar';
import { Title } from './Title';


export function AppBar({ onOpenDrawer, ...optionals }) {

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
  const theme = useTheme();
  let justifyStyle;
  useMediaQuery(theme.breakpoints.up('md'))
    ? (justifyStyle = 'flex-end')
    : (justifyStyle = 'center');


  // States
  const [lastUpdateTime, setLastUpdateTime] = useState('');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);


  useEffect(() => {
    // If it's the first time
    if (!checkNotFirstVisit()) {
      setIsHelpModalOpen(true);
    }
  }, []);

  const handleHelpModalClose = () => {
    setIsHelpModalOpen(false);
  };


  return (
    <div>
      <MUIAppBar
        position='sticky'
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
                setIsDrawerOpen={onOpenDrawer}
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
            </Grid>
            <RandomBtn />
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
      <HelpModal open={isHelpModalOpen} onClose={handleHelpModalClose} />
    </div>
  );
}
