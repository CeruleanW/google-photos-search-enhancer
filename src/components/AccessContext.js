import React, { useState, useContext } from 'react';

const AccessContext = React.createContext();
const AccessUpdateContext = React.createContext();

export function useAccessToken() {
  return useContext(AccessContext);
}

export function useAccessTokenUpdate() {
  return useContext(AccessUpdateContext);
}

export default function AccessProvider( {children} ) {
  const [accessToken, setAccessToken] = useState('');

  function handleAccessTokenFromGoogleBtn(token) {
    setAccessToken(token);
  }

  return (
    <AccessContext.Provider value={accessToken}>
      <AccessUpdateContext.Provider value={handleAccessTokenFromGoogleBtn}>
      {children}
      </AccessUpdateContext.Provider>
    </AccessContext.Provider>
  )
}
