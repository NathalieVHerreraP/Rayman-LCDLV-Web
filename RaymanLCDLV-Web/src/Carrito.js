// Cart.js
import React, { useEffect, useState } from "react";
import "./Carrito.css";

const Cart = ({ cartItems, onUpdateCartItem, onRemoveFromCart, isAuthenticated }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Cargar detalles del producto desde la API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/productos");
        const data = await response.json();
        if (Array.isArray(data)) {
          setProductDetails(data);
        } else {
          console.error("La API no devolvió un array válido:", data);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductDetails();
  }, []);

  // Combinar productos con sus detalles
  const cartWithDetails = cartItems.map((item) => {
    const product = productDetails.find((prod) => prod.Nombre === item.Nombre);
    return product ? { ...item, ...product } : item;
  });

  // Calcular el total
  const total = cartWithDetails.reduce((sum, item) => {
    const precio = parseFloat(item.Precio.replace(/[^0-9.-]+/g, "")) || 0;
    return sum + precio * (item.quantity || 1);
  }, 0);

  // Manejar cambios en la cantidad
  const handleQuantityChange = (index, delta) => {
    if (index >= 0 && index < cartItems.length) {
      const updatedItems = [...cartItems];
      const currentQuantity = updatedItems[index].quantity || 1;
      const newQuantity = currentQuantity + delta;

      if (newQuantity > 0) {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: newQuantity,
        };
        onUpdateCartItem(updatedItems);
      }
    }
  };

  // Procesar compra con PayPal
  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/paypal/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartWithDetails }),
      });

      const result = await response.json();

      if (response.ok && result.id) {
        setOrderId(result.id);
        alert(`Orden creada con éxito. ID de la orden: ${result.id}`);
        onUpdateCartItem([]); // Vacía el carrito tras la compra
      } else {
        alert("Error al procesar la compra: " + result.error);
      }
    } catch (error) {
      alert("Error inesperado al realizar la compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cartWithDetails.length > 0 ? (
        <>
          <ul className="cart-items">
            {cartWithDetails.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.Imagen} alt={item.Nombre} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.Nombre}</h3>
                  <p>{item.Descripcion}</p>
                  <p>
                    <strong>Precio unitario:</strong> {item.Precio}
                  </p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </div>
                  <button onClick={() => onRemoveFromCart(index)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button
              className="purchase-button"
              onClick={handlePurchase}
              disabled={loading || !isAuthenticated}
            >
              {loading ? "Procesando..." : isAuthenticated ? "Comprar" : "Inicia sesión para comprar"}
            </button>
          </div>
        </>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;