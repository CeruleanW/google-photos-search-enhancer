import React from 'react';
import { Button } from '../../../components/atomic/Button';
import { getRandomKeys } from '../foo';
import { getValue } from '../../../features/client-storage';
import { LocalMediaItem } from '../../g-api/types';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayedPhotos } from '@/providers/redux/photosSlice';
import { requestMediaItemsByIds } from '@/features/media-items';

export function RandomBtn(props) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const keys = await getRandomKeys();
    console.log('random keys', keys);
    const values: LocalMediaItem[] = await Promise.all(keys.map(key => getValue(key)));
    const ids = values.map(value => value?.id);
    const urls = await requestMediaItemsByIds(ids);
    console.log('dispatched urls', urls);
    dispatch(setDisplayedPhotos(urls));
  };

  return (
    <>
      <Button onClick={handleClick}>Random</Button>
    </>
  )
}