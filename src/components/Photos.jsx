import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css';
import Skeleton from '@material-ui/lab/Skeleton';
import { useUrl } from './Context/UrlsContext';
import { selectDisplayedPhotos } from '@/providers/redux/photosSlice';
import { useSelector } from 'react-redux';

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

function PhotoList(props) {
  const {photoUrls} = props;

  const classes = useStyles();
  const breakpointColumnsObj = {
    default: 6,
    1920: 4,
    1280: 3,
    960: 2,
    600: 1,
  };

  const handleClick = (url) => {
    window.open(url);
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj} 
      className={classes.masonryGrid}
      columnClassName={classes.masonryGridColumn}
    >
      {props.ids.map((id, index) => (
        <img
          key={id}
          src={`${photoUrls[index]?.baseUrl}=w640-h640`}
          alt='Google Photos'
          className={classes.image}
          onClick={() => handleClick(photoUrls[index]?.productUrl)}
        />
      ))}
    </Masonry>
  );
}

export default function PhotosContainer(props) {
  // Style
  const classes = useStyles();

  // States
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const photoUrls = useUrl().photoUrls;
  const displayedPhotos = useSelector(selectDisplayedPhotos);

  // TODO: because async requests after searching for displaying, we have to wait
  // should fix the timeout logic later
  useEffect(() => {
    // setLoadingPhotos(true);

    const timer = setTimeout(() => {
      setLoadingPhotos(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.root}>
      {loadingPhotos ? (
        <Grid container spacing={1}>
          {props.ids.map((id) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
              <Skeleton variant='rect' height={300} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <PhotoList photoUrls={photoUrls} {...props} />
      )}
    </div>
  );
}
