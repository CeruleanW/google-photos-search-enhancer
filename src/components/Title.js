import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.2rem',
    },
  }
}));

export function Title({ setIsDrawerOpen, clsx, isDrawerOpen }) {
  const classes = useStyles();

  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={() => setIsDrawerOpen(true)}
        edge='start'
        className={clsx(classes.menuButton, isDrawerOpen && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' className={classes.title}>
        Google Photos Search Enhancer
      </Typography>
    </>
  );
}