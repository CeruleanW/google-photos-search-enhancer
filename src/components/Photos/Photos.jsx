import React from 'react';
import { requestImages } from './../GapiConnection';
import { GridList, GridListTile, Grid } from '@material-ui/core';
import { useAccessToken } from './../AccessContext';
import { makeStyles } from '@material-ui/core/styles';

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
    "&:hover": {
      opacity: 0.5
    }
  },
  offset: theme.mixins.toolbar,
}));

export default function Photos(props) {
  const accessToken = useAccessToken();
  const classes = useStyles();

  // return a list of image elements
  function handlePhotoGridUrls(baseUrls) {
    // add width and height
    const urlsWithParas = baseUrls.map((url) => `${url}=w640-h480`);
    return urlsWithParas;
  }

  // function handleProduceUrls()

  let grids = [];
  if (props.photoUrls.length > 0) {
    grids = handlePhotoGridUrls(props.photoUrls);
  }

  return (
    <div className={classes.root}>
      {/* <GridList cellHeight='auto' cols={3}>
      {grids.map((imgUrl, index) => (
          <GridListTile key={index} rows={2} cols={3} className={classes.gridListTile} >
            <img key={index} src={imgUrl} alt='Google Photos' className={classes.image}/>
          </GridListTile>))}
      </GridList> */}
      <Grid container spacing={1}>
      {grids.map((imgUrl, index) => (
          <Grid item key={index} cols={3} className={classes.gridListTile}>
            <img key={index} src={imgUrl} alt='Google Photos' className={classes.image}/>
          </Grid>))}
      </Grid>
    </div>
  );
}
