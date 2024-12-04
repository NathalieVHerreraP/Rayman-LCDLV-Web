import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Home";
import Catalogo from "./catalogo";
import Marcadores from "./Marcadores";
import AuthForm from "./AuthForm";
import UserProfile from "./UserProfile";
import Cart from "./Carrito";
import PurchaseConfirmation from "./PurchaseConfirmation";
import Scoreboard from "./scoreboard";
import JugadorDetalles from "./Jugadordetalles";
import { getToken, removeToken } from "./tokenStorage";
import "./App.css";
import logo from "./images/Logo2.png"; // Asegúrate de que la ruta de la imagen sea correcta

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userImage, setUserImage] = useState(logo); // Cambiado para usar la imagen importada
  const [cartItems, setCartItems] = useState([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await getToken();
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/validateToken", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            setIsAuthenticated(true);
            setUserImage(data.user?.image || logo);
          } else {
            setIsAuthenticated(false);
            setUserImage(logo);
          }
        } catch {
          setIsAuthenticated(false);
          setUserImage(logo);
        }
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserImage(userData.image || logo);
    navigate("/Home");
  };

  const handleLogout = async () => {
    await removeToken();
    setIsAuthenticated(false);
    setUserImage(logo);
    navigate("/AuthForm");
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const handleUpdateCartItem = (updatedItems) => {
    setCartItems(updatedItems);
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch("/api/paypal/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      const result = await response.json();
      if (result.success) {
        setPurchaseSuccess(true);
        setCartItems([]); // Vaciar el carrito
        navigate("/confirmation");
      } else {
        setPurchaseSuccess(false);
        navigate("/confirmation");
      }
    } catch (error) {
      setPurchaseSuccess(false);
      navigate("/confirmation");
    }
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`?search=${searchQuery}`);
    }
  };

  // Mostrar notificación al cargar la aplicación
  useEffect(() => {
    toast.info("Inicia sesión para tener una experiencia más satisfactoria.", {
      position: "top-right", // Corregido para usar cadena en lugar de constante
      autoClose: 8000,
      icon: <img src={logo} alt="logo" style={{ width: "20px", height: "20px" }} />,
    });
  }, []);

  return (
    <div className="app-container">
      <ToastContainer />
      <header className="header">
        <div className="left-header">
          {isAuthenticated ? (
            <img
              src={userImage}
              alt="Usuario"
              className="user-icon"
              onClick={() => navigate("/UserProfile")}
            />
          ) : (
            <img src={logo} alt="Logo" className="user-icon" />
          )}
          <nav className="nav-menu">
            <Link to="/Home">Home</Link>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/Marcadores">Marcadores</Link>
            <Link to="/Scoreboard">Crear marcador</Link>
          </nav>
        </div>
        <div className="right-header">
          <input
            type="text"
            placeholder="Buscar..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className="cart-icon" onClick={() => navigate("/cart")}>
            🛒<span className="cart-count">{cartItems.length}</span>
          </div>
          {!isAuthenticated ? (
            <button onClick={() => navigate("/AuthForm")} className="login-button">
              Iniciar Sesión
            </button>
          ) : (
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/Home" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/catalogo" element={<Catalogo onAddToCart={handleAddToCart} />} />
          <Route path="/Marcadores" element={<Marcadores />} />
          <Route path="/AuthForm" element={<AuthForm onLogin={handleLogin} />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateCartItem={handleUpdateCartItem}
                onRemoveFromCart={handleRemoveFromCart}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/confirmation"
            element={<PurchaseConfirmation success={purchaseSuccess} />}
          />
          <Route path="/jugador/:id" element={<JugadorDetalles />} />
          <Route path="/Scoreboard" element={<Scoreboard isAuthenticated={isAuthenticated} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;