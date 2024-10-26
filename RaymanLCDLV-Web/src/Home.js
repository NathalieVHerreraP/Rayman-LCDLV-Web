import React from 'react';
import './App.css'; // Asegúrate de agregar tus estilos CSS aquí

const Home = () => {
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
          <div className="item-card">
            <img src="tepa.png" alt="Tepa de Agua" />
            <span><strong>Tepa de Agua</strong></span>
          </div>
          <div className="item-card">
            <img src="caguama.png" alt="Caguama de Dulce" />
            <span><strong>Caguama de Dulce</strong></span>
          </div>
          <div className="item-card">
            <img src="tanga.png" alt="Tanga de Lucia" />
            <span><strong>Tanga de Lucia</strong></span>
          </div>
          <div className="item-card">
            <img src="churr0.png" alt="Churro sin azúcar" />
            <span><strong>Churro sin azúcar</strong></span>
          </div>
        </div>
      </section>

      <section className="store-items-section">
        <h2>Objetos de Tienda</h2>
        <div className="item-grid">
          <div className="item-card">
            <img src="Suqlento.png" alt="Estatua Sqlolento" />
            <span><strong>Estatua Sqlolento</strong></span>
          </div>
          <div className="item-card">
            <img src="cocadepiña.png" alt="Coca de Piña" />
            <span><strong>Coca de Piña</strong></span>
          </div>
          <div className="item-card">
            <img src="rosa.png" alt="¿Y esta Rosa?" />
            <span><strong>¿Y esta Rosa?</strong></span>
          </div>
          <div className="item-card">
            <img src="censurado.png" alt="Censurado" />
            <span><strong>Censurado</strong></span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;