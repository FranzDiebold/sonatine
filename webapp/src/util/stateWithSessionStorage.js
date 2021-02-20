// inspired by https://github.com/the-road-to-learn-react/react-local-storage

import { useState, useEffect } from 'react';

const useStateWithSessionStorage = (initialValue, sessionStorageKey) => {
  const [value, setValue] = useState(
    JSON.parse(sessionStorage.getItem(sessionStorageKey)) || initialValue
  );

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useStateWithSessionStorage;
