import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { usePhotoUrl } from '../UrlsContext';
import Masonry from 'react-masonry-css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: '10px',
  },
  gridListTile: {
    maxWidth: 480,
    maxHeight: 360,
  },
  image: {
    maxWidth: '100%',
    '&:hover': {
      opacity: 0.5,
    },
  },
  offset: theme.mixins.toolbar,
  masonryGrid: {
    display: 'flex',
    marginLeft: '-30px' /* gutter size offset */,
    width: '100%',
  },
  masonryGridColumn: {
    paddingLeft: '20px' /* gutter size */,
    backgroundClip: 'padding-box',
    /* change div to reference your elements you put in <Masonry> */
    '& > div': {
      marginBottom: '30px',
    },
  },
}));

export default function Photos() {
  const classes = useStyles();
  const photoUrls = usePhotoUrl();

  // process base urls into image src urls
  let gridsBaseUrls = [];
  if (photoUrls.length > 0) {
    gridsBaseUrls = photoUrls.map((url) => `${url.baseUrl}=w640-h640`);
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const handleClick = (url) => {
    window.open(url);
  };

  return (
    <div className={classes.root}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}
      >
        {gridsBaseUrls.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt='Google Photos'
            className={classes.image}
            onClick={() => handleClick(photoUrls[index].productUrl)}
          />
        ))}
      </Masonry>
    </div>
  );
}
