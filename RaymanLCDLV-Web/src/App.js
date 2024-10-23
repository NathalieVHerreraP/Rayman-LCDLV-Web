import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './Home';
import Catalogo from './catalogo'; 
import Marcadores from './Marcadores';
import AuthForm from './AuthForm';
import UserProfile from './UserProfile'; // Importar la nueva página de perfil de usuario
import './App.css';
import Scoreboard from './scoreboard';
import JugadorDetalles from './Jugadordetalles';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userImage, setUserImage] = useState('Logo.png'); // Imagen por defecto
  const [newPlayer, setNewPlayer] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    // Aquí puedes realizar la autenticación con la API (ejemplo en comentarios)
    /*
      fetch('https://api.example.com/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsAuthenticated(true);
          setUserImage(data.userImage); // Imagen del usuario recibida desde la API
        }
      });
    */
    setIsAuthenticated(true);
    setUserImage('user-logged-in.png'); // Cambiar a imagen del usuario autenticado
    navigate('/Home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserImage('Logo.png');
  };

  const handleAddPlayer = (player) => {
    setNewPlayer(player);
    navigate('/Marcadores'); 
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="left-header">
          {isAuthenticated ? (
            <img 
              src={userImage} 
              alt="Usuario" 
              className="user-icon" 
              onClick={() => navigate('/UserProfile')}
            />
          ) : (
            <img src="Logo.png" alt="Logo" className="user-icon" />
          )}
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
            <button onClick={() => navigate('/AuthForm')} className="login-button">Iniciar Sesión</button>
          ) : (
            <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/Marcadores" element={<Marcadores newPlayer={newPlayer} />} />
        <Route path="/AuthForm" element={<AuthForm onLogin={handleLogin} />} />
        <Route path="/Scoreboard" element={<Scoreboard onAddPlayer={handleAddPlayer} />} />
        <Route path="/UserProfile" element={<UserProfile />} /> {/* Nueva página de perfil de usuario */}
        <Route path="/" element={<Marcadores />} />
        <Route path="/jugador/:id" element={<JugadorDetalles />} /> {/* Ruta dinámica para los detalles */}
      </Routes>
    </div>
  );
};

export default App;