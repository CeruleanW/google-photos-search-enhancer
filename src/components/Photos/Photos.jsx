
import React from 'react';
import {requestImages} from './../GapiConnection';



export default function Photos(props) {  
  // return photos grids
  async function displayPhotoGrids(baseUrls) {
    const urlsWithParas = baseUrls.map((url) => `${url}=w900-h720`);
    // use base urls to send request for images
    const result = await requestImages(urlsWithParas);
    return ;
  }

  
  return (
    <>
     {displayPhotoGrids(props.photoUrls)}       
    </>
  );
}
