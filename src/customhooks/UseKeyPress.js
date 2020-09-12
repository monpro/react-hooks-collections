import React, { useState, useEffect } from 'react';

const useKeyPress = (tareget) => {
  const [keyPressed, setKeyPressed] = useState(false);


  const keyDown = ({key}) => {
    if(key === tareget) {
      setKeyPressed(true);
    }
  };

  const keyUp = ({key}) => {
    if(key === tareget) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    }
  });

  return keyPressed;
};
