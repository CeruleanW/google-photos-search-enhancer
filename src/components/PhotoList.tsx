import React from 'react';
import Masonry from 'react-masonry-css';
import { useStyles } from './Photos';

export function PhotoList(props) {
  const { photoUrls } = props;

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
      {photoUrls.map((photoItem) => (
        <img
          key={photoItem?.baseUrl}
          src={`${photoItem?.baseUrl}=w640-h640`}
          alt='Google Photos'
          className={classes.image}
          onClick={() => handleClick(photoItem?.productUrl)} />
      ))}
    </Masonry>
  );
}
