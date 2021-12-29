import React from 'react';
import { Button } from '../../../components/atomic/Button';
import { getRandomKeys } from '../foo';
import { getValue } from '../../../features/client-storage';
import { LocalMediaItem } from '../../g-api/types';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayedPhotos } from '@/providers/redux/photosSlice';

export function RandomBtn(props) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const keys = await getRandomKeys();
    console.log('random keys', keys);
    const values: LocalMediaItem[] = await Promise.all(keys.map(key => getValue(key)));
    console.log('random values', values);
    dispatch(setDisplayedPhotos(values));
  };

  return (
    <>
      <Button onClick={handleClick}>Random</Button>
    </>
  )
}