import React, { useState, useContext } from 'react';

const FeedbackContext = React.createContext();
const FeedbackUpdateContext = React.createContext();

export function useFeedback() {
  return useContext(FeedbackContext);
}

export function useFeedbackUpdate() {
  return useContext(FeedbackUpdateContext);
}

export default function FeedbackProvider( {children} ) {
  const [isBackdropOpened, setisBackdropOpened] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  function handleBackdrop(isBackdropOpened) {
    setisBackdropOpened(isBackdropOpened);
  }

  function handleTextMessage(text) {
    setTextMessage(text);
  }

  function handleIsSearching(isSearch) {
    setIsSearching(isSearch);
  }


  return (
    <FeedbackContext.Provider value={{isBackdropOpened, textMessage, isSearching}}>
      <FeedbackUpdateContext.Provider value={{handleBackdrop, handleTextMessage, handleIsSearching}}>
      {children}
      </FeedbackUpdateContext.Provider>
    </FeedbackContext.Provider>
  )
}
