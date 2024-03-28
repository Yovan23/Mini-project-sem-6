import { useEffect, useState } from 'react';

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token'); 
    setAuthToken(token);
  }, []); 

  return authToken;
};

export default useAuthToken;
