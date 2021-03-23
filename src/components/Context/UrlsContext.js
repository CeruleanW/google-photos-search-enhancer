import React, { useState, useContext } from 'react';

const PhotoUrlContext = React.createContext();
const PhotoUrlUpdateContext = React.createContext();

export function useUrl() {
  return useContext(PhotoUrlContext);
}

export function useUrlUpdate() {
  return useContext(PhotoUrlUpdateContext);
}

export default function UrlsProvider( {children} ) {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [searchedIds, setSearchedIds] = useState([]);

  function handleSearchedIds(ids) {
    setSearchedIds(ids);
  }

  function handlePhotoUrls(photoUrls) {
    setPhotoUrls(photoUrls);
  }

  return (
    <PhotoUrlContext.Provider value={{photoUrls, searchedIds}}>
      <PhotoUrlUpdateContext.Provider value={{handlePhotoUrls, handleSearchedIds}}>
      {children}
      </PhotoUrlUpdateContext.Provider>
    </PhotoUrlContext.Provider>
  )
}
