import React, { useState, useContext } from 'react';

const AccessContext = React.createContext();
const AccessUpdateContext = React.createContext();

export function useAccess() {
  return useContext(AccessContext);
}

export function useAccessUpdate() {
  return useContext(AccessUpdateContext);
}

export default function AccessProvider( {children} ) {
  const [accessToken, setAccessToken] = useState('');
  const [isLogined, setIsLogined] = useState(false);

  function handleAccessToken(token) {
    setAccessToken(token);
  }

  function handleIsLogined(logined) {
    setIsLogined(logined);
  }

  return (
    <AccessContext.Provider value={{accessToken, isLogined}}>
      <AccessUpdateContext.Provider value={{handleAccessToken, handleIsLogined}}>
      {children}
      </AccessUpdateContext.Provider>
    </AccessContext.Provider>
  )
}
