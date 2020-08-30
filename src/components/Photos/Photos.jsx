import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css';
import Skeleton from '@material-ui/lab/Skeleton';
import { useUrl } from '../UrlsContext';

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
    default: 6,
    1920: 4,
    1280: 3,
    960: 2,
    600: 1,
  };

  // States
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const photoUrls = useUrl().photoUrls;

  useEffect(() => {
    setLoadingPhotos(true);

    const timer = setTimeout(() => {
      setLoadingPhotos(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (url) => {
    window.open(url);
  };

  return (
    <div className={classes.root}>
      {loadingPhotos ? (
        <Grid container spacing={1} >
          {props.ids.map((id) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
              <Skeleton variant='rect' height={300} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={classes.masonryGrid}
          columnClassName={classes.masonryGridColumn}
        >
          {props.ids.map((id, index) => (
            <img
              key={id}
              src={`${photoUrls[index].baseUrl}=w640-h640`}
              alt='Google Photos'
              className={classes.image}
              onClick={() => handleClick(photoUrls[index].productUrl)}
            />
          ))}
        </Masonry>
      )}
    </div>
  );
}
