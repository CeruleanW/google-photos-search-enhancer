import React, { useState, useContext } from 'react';

const PhotoUrlContext = React.createContext();
const PhotoUrlUpdateContext = React.createContext();

export function usePhotoUrl() {
  return useContext(PhotoUrlContext);
}

export function usePhotoUrlUpdate() {
  return useContext(PhotoUrlUpdateContext);
}

export default function UrlsProvider( {children} ) {
  const [photoUrls, setPhotoUrls] = useState([]);

  function handlePhotoUrls(photoUrls) {
    setPhotoUrls(photoUrls);
  }

  return (
    <PhotoUrlContext.Provider value={photoUrls}>
      <PhotoUrlUpdateContext.Provider value={handlePhotoUrls}>
      {children}
      </PhotoUrlUpdateContext.Provider>
    </PhotoUrlContext.Provider>
  )
}
