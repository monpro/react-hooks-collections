import React, { useCallback, useState } from 'react';


export const useArray = initArray => {
  const [value, setValue] = useState(initArray);

  return {
    value,
    setValue,
    add: useCallback(addVal => setValue(v => [...v, addVal])),
    clear: useCallback(() => setValue(() => [])),
    removeIndex: useCallback(index => setValue(v => {
      v.splice(index, 1);
      return v
    })),
  }
};


