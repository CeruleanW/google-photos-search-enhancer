import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { searchForItems } from '../features/client-storage';
import { useAccess } from './Context/AccessContext';
import { useFeedbackUpdate } from './Context/FeedbackContext';
import { useDispatch } from 'react-redux';
import { requestMediaItemsByIds } from '../features/media-items';
import { setDisplayedPhotos } from '@/providers/redux/photosSlice';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const accessToken = useAccess().accessToken;
  const isLogined = useAccess().isLogined;
  const updateIsSearching = useFeedbackUpdate().handleIsSearching;
  const updateIsNoMatch = useFeedbackUpdate().handleIsNoMatch;

  // Local state
  const [keyword, setKeyword] = useState('');

  // Search, use the keyword in state, go through the local IndexedDB, pass the base urls to Photos
  const handleSearch = async () => {
    const t0 = performance.now();
    console.log(`Search start: ${t0} milliseconds`);

    // No input in the searchbar
    if (!keyword) {
      return false;
    }

    // show the progress feedback
    updateIsSearching(true);

    // send keyword to search media items from IndexedDB
    // get the image URLs
    const fulfilled = await searchForItems(keyword);
    const ids = fulfilled.map((data) => data?.item?.id);
    if (!ids?.length) {
      // display a error feedback
      updateIsNoMatch(true);
      return 'No result';
    }
    updateIsSearching(false);

    // request for the base urls and the product urls
    const urls = await requestMediaItemsByIds(ids, accessToken);
    // console.log('urls', urls);
    // send the base urls in response to App
    dispatch(setDisplayedPhotos(urls));
  };

  const handleClick = () => {
    handleSearch()
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
        <Button variant='contained' onClick={handleClick} disabled={!isLogined}>
          Search
        </Button>
      </Grid>
    </>
  );
}
