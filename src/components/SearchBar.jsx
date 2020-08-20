import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { search } from './IndexedDBController';
import {requestForBaseUrls} from './GapiConnection';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    // width: '100%',
    // marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      // marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(0),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    marginRight: theme.spacing(2),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    // width: '70%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');

  // Search the local IndexedDB by the keyword in state, display the results
  const handleSearch = () => {
    if (!keyword) {return false}
    // pass keyword to search media items from IndexedDB
    // get the image URLs
    search(keyword).then( (fulfilled) => {
      console.log(fulfilled);
      const ids = fulfilled; 
      // request for baseUrls
      requestForBaseUrls(ids, props.accessToken).then(
        (baseUrls) => {
          console.log(baseUrls);
          // send the base urls in response to App
          props.onPhotos(baseUrls);
        }
      );
    }).catch( rejected => console.log('Error: ' + rejected));

  };
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  }

  return (
    <>
      <Grid className={classes.search} item xs={9}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleKeywordChange}
        />
      </Grid>
      <Grid item>
        <Button variant='contained' onClick={handleSearch}>
          Search
        </Button>
      </Grid>
    </>
  );
}
