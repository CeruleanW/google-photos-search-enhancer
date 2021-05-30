import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { searchForItems } from './lib/indexedDBController';
import { requestForSingleItem } from './lib/GapiConnection';
import { useAccess } from './Context/AccessContext';
import { useUrlUpdate } from './Context/UrlsContext';
import { useFeedbackUpdate } from './Context/FeedbackContext';

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
  const isLogined = useAccess().isLogined;
  const updatePhotoUrls = useUrlUpdate().handlePhotoUrls;
  const updateIsSearching = useFeedbackUpdate().handleIsSearching;
  const updateSearchedIds = useUrlUpdate().handleSearchedIds;
  const updateIsNoMatch = useFeedbackUpdate().handleIsNoMatch;

  const [keyword, setKeyword] = useState('');

  // Search, use the keyword in state, go through the local IndexedDB, pass the base urls to Photos
  const handleSearch = () => {
    const t0 = performance.now();
    console.log(`Search start: ${t0} milliseconds`);

    // No input in the searchbar
    if (!keyword) {
      return false;
    }

    // show the progress feedback
    updateIsSearching(true);

    // reset search result to null
    updateSearchedIds([]);

    // send keyword to search media items from IndexedDB
    // get the image URLs
    searchForItems(keyword)
      .then((fulfilled) => {
        const ids = fulfilled.map( data => data.item.id);
        updateSearchedIds(ids);
        if (!ids.length) {
          // display a error feedback
          updateIsNoMatch(true);
          return 'No result';
        }
        updateIsSearching(false);

        // request for the base urls and the product urls
        requestForSingleItem(ids, accessToken).then((urls) => {
          console.log(urls);
          // send the base urls in response to App
          updatePhotoUrls(urls);
        });
      })
      .catch((rejected) => console.log('Error: ' + rejected))
      .finally(() => updateIsSearching(false));
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleSearch();
    }
  };

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
          autoFocus={true}
        />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          onClick={handleSearch}
          disabled={!isLogined}
        >
          Search
        </Button>
      </Grid>
    </>
  );
}
