import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Catalogo from './catalogo';
import './App.css'; // Asegúrate de agregar tus estilos CSS aquí
import Marcadores from './Marcadores';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="left-header">
            <img src="User.png" alt="Usuario" className="user-icon" />
            <nav className="nav-menu">
              <Link to="/Home">Home</Link>
              <Link to="/catalogo">Catálogo</Link>
              <Link to="/Marcadores">Marcadores</Link>
            </nav>
          </div>
          <div className="right-header">
            <input type="text" placeholder="Buscar..." className="search-bar" />
            <div className="cart-icon">
              🛒<span className="cart-count">1</span>
            </div>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/Marcadores" element={<Marcadores />} />
            {/* Agrega más rutas aquí según sea necesario */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;