import React, { useState, useEffect, useRef } from 'react'

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value)
  //if searchItem has not been updated within last 500ms.
  // it will hit the api
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay]) // only trigger effect when searchItem or delay change

  return debounceValue
}

const searchCharacters = (search) => {
  return fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${process.env.REACT_APP_API_KEY}&titleStartsWith=${search}`,
    {
      method: 'GET',
    }
  )
}

/**
 * This example is to illustrate the func of useDebounce
 *
const Test = () => {
  const [searchItem, setSearchItem] = useState('');
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchItem = useDebounce(searchItem, 500); // it will not updated within 500ms
  console.log(debouncedSearchItem);
  useEffect( () => {
    if (debouncedSearchItem) {
      setIsSearching(true);
      searchCharacters(debouncedSearchItem).then(result => {
        setIsSearching(false);
        setResult(result);
      });
    } else {
      setResult([])
    }
  }, [debouncedSearchItem]);

  return (
    <div>
      <input
        placeholder="Search Marvel Comics"
        onChange={e => setSearchItem(e.target.value)}
      />

      {isSearching && <div>Searching ...</div>}

      {result.map(value => (
        <div key={value.id}>
          <h4>{value.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default Test;

**/
