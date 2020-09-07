import React, { useEffect, useRef } from 'react';

const defaultCompare = (prev, next) => {
  return prev && prev.id === next.id
};

// instead of passing an array of dependencies,
// we pass a custom function receives the previous and new value
// if the compare function return true, the hook returns the old object reference
const useMemoCompare = (next, compare=defaultCompare) => {
  const previousRef = useRef();
  const previous = previousRef.current;

  const isEqual = compare(previous, next);

  useEffect(() => {
    if(!isEqual) {
      previous.current = next;
    }
  });
  return isEqual ? previous: next;
};

export default useMemoCompare;
