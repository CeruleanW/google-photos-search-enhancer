import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { usePhotoUrl } from '../UrlsContext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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
}));

export default function Photos() {
  const classes = useStyles();
  const photoUrls = usePhotoUrl();
  let gridsBaseUrls = [];
  if (photoUrls.length > 0) {
    gridsBaseUrls = photoUrls.map((url) => `${url.baseUrl}=w640-h480`);
  }

  const handleClick = (url) => {
    window.open(url);
  } 

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {gridsBaseUrls.map((imgUrl, index) => (
          <Grid item key={index} cols={3} className={classes.gridListTile}>
            <img
              key={index}
              src={imgUrl}
              alt='Google Photos'
              className={classes.image}
              onClick={() => handleClick(photoUrls[index].productUrl)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
