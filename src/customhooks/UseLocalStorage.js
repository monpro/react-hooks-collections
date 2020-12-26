import React, { useState } from 'react'

const useLocalStorage = (key, defaultValue) => {
  const [localValue, setLocalValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      console.log(e)
      return defaultValue
    }
  })

  const setValue = (value) => {
    try {
      const storeValue = value instanceof Function ? value(localValue) : value
      setLocalValue(storeValue)
      window.localStorage.setItem(key, JSON.stringify(storeValue))
    } catch (e) {
      console.log(e)
    }
  }
  return [localValue, setValue]
}

/**
 * This example is used to illustrate useLocalStorage
 *
const Test = () => {
  const [name, setName] = useLocalStorage('name', 'mike');
  const convertString = val => val.toUpperCase();
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(convertString(e.target.value))}
      />
    </div>
  );
};
export default Test;
**/
