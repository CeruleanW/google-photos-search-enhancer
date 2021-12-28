import React from 'react';
import icon from '../images/icons8-search-500.png';
import { useStyles } from './Main';

export const CenterBackground = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.centerText + ' ' + classes.centerLayout}>
      <img src={icon} alt='search-icon' className={classes.image} />
    </div>
  );
};
