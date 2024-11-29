import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateToken, getToken } from '../utils/validate';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      const valid = await validateToken();
      setIsAuthenticated(valid);

      if (valid) {
        const token = await getToken();
        const response = await fetch('http://localhost:5000/getUserProfile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setUserImage(data.imagen); // Base64 image
      }
    };

    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userImage, setUserImage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);