import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import Catalogo from './catalogo';  // Asegúrate de que el nombre del archivo coincida con el import
import Marcadores from './Marcadores';
import AuthForm from './AuthForm';
import './App.css';
import Scoreboard from './scoreboard'; // Importación correcta de scoreboard.js

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userImage, setUserImage] = useState('User.png');
  const [newPlayer, setNewPlayer] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/AuthForm');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserImage('User.png');
  };

  const handleAddPlayer = (player) => {
    setNewPlayer(player);
    navigate('/Marcadores'); // Redirigir a la pantalla de marcadores
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="left-header">
          {isAuthenticated && <img src={userImage} alt="Usuario" className="user-icon" />}
          <nav className="nav-menu">
            <Link to="/Home">Home</Link>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/Marcadores">Marcadores</Link>
            <Link to="/Scoreboard">Crear marcador</Link>
          </nav>
        </div>
        <div className="right-header">
          <input type="text" placeholder="Buscar..." className="search-bar" />
          <div className="cart-icon">
          🛒<span className="cart-count">1</span>
          </div>
          {!isAuthenticated ? (
            <button onClick={handleLogin} className="login-button">Iniciar Sesión</button>
          ) : (
            <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/Marcadores" element={<Marcadores newPlayer={newPlayer} />} />
        <Route path="/AuthForm" element={<AuthForm />} />
        <Route path="/Scoreboard" element={<Scoreboard onAddPlayer={handleAddPlayer} />} />
      </Routes>
    </div>
  );
};

export default App;