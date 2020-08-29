import React, { useEffect, useState } from 'react';
import {} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    marginTop: '10px',
    marginLeft: '10px',
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

export default function Photos(props) {
  // Style
  const classes = useStyles();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [gridsBaseUrls, setGridsBaseUrls] = useState([]);

  useEffect(() => {
    setLoadingPhotos(true);
    // process base urls into image src urls
    if (props.photoUrls.length > 0) {
      setGridsBaseUrls(props.photoUrls.map((url) => `${url.baseUrl}=w640-h640`));
    }
    const timer = setTimeout(() => {
      setLoadingPhotos(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [props.photoUrls, setLoadingPhotos]);

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
        {gridsBaseUrls.map((imgUrl, index) =>
          loadingPhotos ? (
            <Skeleton key={index} height={12} variant='rect' />
          ) : (
            <img
              key={index}
              src={imgUrl}
              alt='Google Photos'
              className={classes.image}
              onClick={() => handleClick(props.photoUrls[index].productUrl)}
            />
          )
        )}
      </Masonry>
    </div>
  );
}
