import React, { useState } from 'react';
import '../src/catalogo.css';

const Catalogo = ({ onAddToCart }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const peluches = [
    { imgSrc: 'luka.png', alt: 'Luka', name: 'Luka', price: '$15', description: 'Peluche suave y esponjoso de Luka' },
    { imgSrc: 'PelucheRayman.png', alt: 'Rayman', name: 'Rayman', price: '$18', description: 'Rayman con extremidades desmontables' },
    { imgSrc: 'churro.png', alt: 'Churro', name: 'Churro', price: '$10', description: 'Peluche de churro con aroma dulce' },
    { imgSrc: 'Cerveza.png', alt: 'Agua de piña', name: 'Agua de piña', price: '$8', description: 'Un peluche refrescante' },
  ];

  const figurasColeccionables = [
    { imgSrc: 'raymandes.png', alt: 'Rayman', name: 'Rayman', price: '$20', description: 'Figura coleccionable de Rayman' },
    { imgSrc: 'luka2.png', alt: 'Luka chikito', name: 'Luka chikito', price: '$12', description: 'Mini figura de Luka' },
    { imgSrc: 'Suqlento.png', alt: 'Figura SuQloLento', name: 'Figura SuQloLento', price: '$25', description: 'Figura exclusiva de SuQloLento' },
    { imgSrc: 'Llavero.png', alt: 'Llavero', name: 'Llavero', price: '$5', description: 'Llavero decorativo' },
  ];

  return (
    <main className="main-content">
      <section className="collectibles-section">
        <h2 className="section-title">Peluches</h2>
        <div className="item-grid">
          {peluches.map((item, index) => (
            <div 
              key={index} 
              className="item-card" 
              onMouseEnter={() => setActiveTooltip(index)} 
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <img src={item.imgSrc} alt={item.alt} />
              <span><strong>{item.name}</strong></span>
              <button 
                className="cart-button" 
                onClick={onAddToCart}
              >
                🛒
              </button>
              {activeTooltip === index && (
                <div className="tooltip">
                  <p><strong>Precio:</strong> {item.price}</p>
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="store-items-section">
        <h2 className="section-title">Figuras coleccionables</h2>
        <div className="item-grid">
          {figurasColeccionables.map((item, index) => (
            <div 
              key={index + peluches.length} 
              className="item-card" 
              onMouseEnter={() => setActiveTooltip(index + peluches.length)} 
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <img src={item.imgSrc} alt={item.alt} />
              <span><strong>{item.name}</strong></span>
              <button 
                className="cart-button" 
                onClick={onAddToCart}
              >
                🛒
              </button>
              {activeTooltip === index + peluches.length && (
                <div className="tooltip">
                  <p><strong>Precio:</strong> {item.price}</p>
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Catalogo;