import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { formatDate } from '@/features/date';

export function LastUpdateTime({lastUpdateTime, ...optionals}) {
  return (
    <>
      <Typography
          variant='subtitle1'
          display='block'
          gutterBottom
          color='textSecondary'
        >
          <Box>Last Update:</Box>
          {lastUpdateTime ? formatDate(lastUpdateTime) : 'No data'}
        </Typography>
    </>
  )
}
