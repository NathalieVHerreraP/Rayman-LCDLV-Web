// Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart, onPurchase }) => {
  const navigate = useNavigate();

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.name}</span> - 
              <span>
                ${item.price !== undefined ? item.price.toFixed(2) : "0.00"}
              </span>
              <button onClick={() => onRemoveFromCart(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={() => onPurchase(cartItems)}>Comprar</button>
      )}
    </div>
  );
};

export default Cart;