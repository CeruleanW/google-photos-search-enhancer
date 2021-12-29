import React from 'react';
import { Button as MUIButton } from '@material-ui/core';

export function Button(props) {
  const {variant='contained', ...rest} = props;

  return <MUIButton variant={variant} {...rest} />;
}
