import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { search } from './IndexedDBController';
import { requestForSingleItem } from './GapiConnection';
import { useAccess } from './AccessContext';
import { usePhotoUrlUpdate } from './UrlsContext';
import { useFeedbackUpdate } from './FeedbackContext';

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

export default function SearchBar() {
  const classes = useStyles();
  const accessToken = useAccess().accessToken;
  const updatePhotoUrlUpdate = usePhotoUrlUpdate();
  const updateIsSearching = useFeedbackUpdate().handleIsSearching;

  const [keyword, setKeyword] = useState('');
  

  // Search the local IndexedDB by the keyword in state, pass the base urls to Photos
  const handleSearch = () => {
    if (!keyword) {return false}

    // show the progress feedback
    updateIsSearching(true);

    // pass keyword to search media items from IndexedDB
    // get the image URLs
    search(keyword).then( (fulfilled) => {
      const ids = fulfilled; 
      if (!ids) {
        return 'No result';
      }
      updateIsSearching(false);
      
      // return the base urls and the product urls
      requestForSingleItem(ids, accessToken).then(
        (urls) => {
          console.log(urls);
          // send the base urls in response to App
          updatePhotoUrlUpdate(urls);
        }
      );
    }).catch( rejected => console.log('Error: ' + rejected)).finally( () => updateIsSearching(false));
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  }

  const handleSearchKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleSearch();
    }
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
          onKeyUp={handleSearchKeyUp}
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
