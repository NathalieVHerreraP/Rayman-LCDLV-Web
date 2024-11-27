import React, { useState, useEffect } from 'react';
import './catalogo.css';

const Catalogo = ({ onAddToCart }) => {
  const [productos, setProductos] = useState([]);
  const [tooltipActivo, setTooltipActivo] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error('La respuesta no es un arreglo válido:', data);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    fetchProductos();
  }, []);

  return (
    <main className="main-content">
      <section className="product-section">
        <h2 className="section-title">Peluches y Figuras</h2>
        <div className="item-grid">
          {productos.length > 0 ? (
            productos.map((item, index) => (
              <div
                key={item._id || index}
                className="item-card"
                onMouseEnter={() => setTooltipActivo(index)}
                onMouseLeave={() => setTooltipActivo(null)}
              >
                <img src={item.Imagen} alt={item.Nombre} />
                <span><strong>{item.Nombre}</strong></span>
                <button
                  className="cart-button"
                  onClick={() => onAddToCart(item)}
                >
                  🛒
                </button>
                {tooltipActivo === index && (
                  <div className="tooltip">
                    <p><strong>Precio:</strong> {item.Precio}</p>
                    <p>{item.Descripcion}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No hay productos disponibles en este momento.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Catalogo;