import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import Home from './Home';
import Catalogo from './catalogo';
import Marcadores from './Marcadores';
import AuthForm from './AuthForm';
import UserProfile from './UserProfile';
import Cart from './Cart';
import PurchaseConfirmation from './PurchaseConfirmation';
import Scoreboard from './scoreboard';
import JugadorDetalles from './Jugadordetalles';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userImage, setUserImage] = useState('Logo.png');
  const [newPlayer, setNewPlayer] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserImage('user-logged-in.png');
    navigate('/Home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserImage('Logo.png');
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch('/api/paypal/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });
      const result = await response.json();
      if (result.success) {
        setPurchaseSuccess(true);
        setCartItems([]);
        navigate('/confirmation');
      } else {
        setPurchaseSuccess(false);
        navigate('/confirmation');
      }
    } catch (error) {
      setPurchaseSuccess(false);
      navigate('/confirmation');
    }
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
          <div className="cart-icon" onClick={() => navigate('/cart')}>
            🛒<span className="cart-count">{cartItems.length}</span>
          </div>
          {!isAuthenticated ? (
            <button onClick={() => navigate('/AuthForm')} className="login-button">Iniciar Sesión</button>
          ) : (
            <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/Home" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/catalogo" element={<Catalogo onAddToCart={handleAddToCart} />} />
        <Route path="/Marcadores" element={<Marcadores newPlayer={newPlayer} />} />
        <Route path="/AuthForm" element={<AuthForm onLogin={handleLogin} />} />
        <Route path="/Scoreboard" element={<Scoreboard onAddPlayer={handleAddPlayer} />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onPurchase={handlePurchase} />} />
        <Route path="/confirmation" element={<PurchaseConfirmation success={purchaseSuccess} />} />
        <Route path="/jugador/:id" element={<JugadorDetalles />} />
      </Routes>
    </div>
  );
};

export default App;