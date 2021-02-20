// inspired by https://github.com/the-road-to-learn-react/react-local-storage

import { useState, useEffect } from 'react';

const useStateWithLocalStorage = (initialValue, localStorageKey) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useStateWithLocalStorage;
