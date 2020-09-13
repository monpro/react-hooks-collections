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
  }, []); // Empty array ensures that effect is only run on mount and unmount


  return keyPressed;
};

/**
 * add useKeyPress example
 *
function Test() {
  const hPress = useKeyPress('h');
  const sPress = useKeyPress('s');

  return (
    <div>
      {hPress && 'you press h'}
      {sPress && 'you press s'}
    </div>
  )
}

export default Test;

 **/
