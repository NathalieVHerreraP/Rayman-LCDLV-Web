import React, { useState, useEffect } from 'react';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Función para obtener productos desde la API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProducts();
  }, []);

  const handlePurchase = async () => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    try {
      const response = await fetch('http://localhost:5000/api/cart/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems, totalAmount }),
      });

      if (!response.ok) {
        throw new Error("Error al realizar la compra");
      }

      const data = await response.json();
      const orderId = data.orderId;
      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.name} width="50" />
              <span>{item.name}</span> - <span>${item.price.toFixed(2)}</span>
              <p>{item.description}</p>
              <button onClick={() => onRemoveFromCart(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={handlePurchase}>Comprar</button>
      )}
    </div>
  );
};

export default Cart;