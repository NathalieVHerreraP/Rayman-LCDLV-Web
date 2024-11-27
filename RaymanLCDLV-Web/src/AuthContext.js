import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userImage, setUserImage] = useState('Logo2.png');

  const login = (userData) => {
    setIsAuthenticated(true);
    setUserImage(userData?.image || 'user-logged-in.png');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserImage('Logo2.png');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userImage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};