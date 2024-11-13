import React, { useState } from 'react';
import './App.css';

const Home = ({ onAddToCart }) => {
  // Estado para mostrar el tooltip específico de cada objeto
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Información de cada objeto coleccionable
  const collectibles = [
    { imgSrc: 'Tepa1.png', alt: 'Tepa de Agua', name: 'Tepa de Agua', description: 'Agua pura extraida de las montañas' },
    { imgSrc: 'Caguama1.png', alt: 'Caguama de Dulce', name: 'Caguama de Dulce', description: 'Caguama llena de dulzura' },
    { imgSrc: 'Tanga1.png', alt: 'Tanga de Lucia', name: 'Tanga de Lucia', description: 'Tanga exclusiva de la colección primavera-verano' },
    { imgSrc: 'churr0.png', alt: 'Churro sin azúcar', name: 'Churro sin azúcar', description: 'Churro light sin azúcar, por que pensamos en tu salud' },
  ];

  // Información de cada objeto de tienda
  const storeItems = [
    { imgSrc: 'Suqlento.png', alt: 'Estatua Sqlolento', name: 'Estatua Sqlolento', description: 'Estatua coleccionable del personaje Sqlolento' },
    { imgSrc: 'cocadepiña.png', alt: 'Coca de Piña', name: 'Coca de Piña', description: 'Refresco de piña especial' },
    { imgSrc: 'rosa.png', alt: '¿Y esta Rosa?', name: '¿Y esta Rosa?', description: 'Rosa decorativa misteriosa' },
    { imgSrc: 'censurado.png', alt: 'Censurado', name: 'Censurado', description: 'Producto especial censurado' },
  ];

  return (
    <main className="main-content">
      <section className="game-section">
        <h2>Rayman: Los Caminos de la Vida</h2>
        <div className="game-description">
          <div className="card">
            <p>
              Rayman: Los Caminos De La Vida, En este juego de Rayman, el objetivo principal es ayudar a Rayman a llegar 
              a la fiesta de cumpleaños de Luka. El juego se desarrolla en un solo nivel continuo, pero está dividido en 
              cuatro fases distintas, cada una con su propio conjunto de desafíos y obstáculos. Cada fase presenta un aumento 
              en la dificultad y requiere que Rayman utilice todas sus habilidades de correr, saltar y esquivar para llegar 
              al final. Al completar todas las fases, Rayman finalmente llega a la fiesta de Luka, donde lo espera una gran 
              celebración. Este juego combina elementos clásicos de plataformas con la emoción de un juego de correr, 
              ofreciendo una experiencia divertida y desafiante para los jugadores de todas las edades.
            </p>
          </div>
          <img src="inicio.png" alt="Game Screenshot" className="game-image" />
        </div>
      </section>

      <section className="collectibles-section">
        <h2>Objetos Coleccionables</h2>
        <div className="item-grid">
          {collectibles.map((item, index) => (
            <div 
              key={index} 
              className="item-card" 
              onMouseEnter={() => setActiveTooltip(index)} 
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <img src={item.imgSrc} alt={item.alt} />
              <span><strong>{item.name}</strong></span>
              {activeTooltip === index && (
                <div className="tooltip">
                  <p></p>
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="store-items-section">
        <h2>Objetos de Tienda</h2>
        <div className="item-grid">
          {storeItems.map((item, index) => (
            <div 
              key={index} 
              className="item-card" 
              onMouseEnter={() => setActiveTooltip(index + collectibles.length)} 
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <img src={item.imgSrc} alt={item.alt} />
              <span><strong>{item.name}</strong></span>
              {activeTooltip === index + collectibles.length && (
                <div className="tooltip">
                  <p></p>
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

export default Home;