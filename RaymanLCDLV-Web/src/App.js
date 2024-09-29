import React from 'react';
import './App.css'; // Asegúrate de agregar tus estilos CSS aquí

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="left-header">
          <img src="User.png" alt="Usuario" className="user-icon" />
          <nav className="nav-menu">
            <a href="App.js">Home</a>
            <a href="/">Catálogo</a>
            <a href="/">Marcadores</a>
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
        <section className="game-section">
          <h2>Rayman: Los Caminos de la Vida</h2>
          <div className="game-description">
          <div class="card">
        <p>Rayman: Los Caminos De La Vida, En este juego de Rayman, el objetivo principal es ayudar a Rayman a llegar 
          a la fiesta de cumpleaños de Luka. El juego se desarrolla en un solo nivel continuo, pero está dividido en 
          cuatro fases distintas, cada una con su propio conjunto de desafíos y obstáculos.Cada fase presenta un aumento 
          en la dificultad y requiere que Rayman utilice todas sus habilidades de correr, saltar y esquivar para llegar 
          al final. Al completar todas las fases, Rayman finalmente llega a la fiesta de Luka, donde lo espera una gran 
          celebración. Este juego combina elementos clásicos de plataformas con la emoción de un juego de correr, 
          ofreciendo una experiencia divertida y desafiante para los jugadores de todas las edades.</p>
    </div>
            <img src="inicio.png" alt="Game Screenshot" className="game-image" />
          </div>
        </section>

        <section className="collectibles-section">
          <h2>Objetos Coleccionables</h2>
          <div className="item-grid">
            <div className="item-card">
              <img src="tepa.png"/>
              <span>Tepa de Agua</span>
            </div>
            <div className="item-card">
              <img src="caguama.png"/>
              <span>Caguama de Dulce</span>
            </div>
            <div className="item-card">
              <img src="tanga.png"/>
              <span>Tanga de Lucia</span>
            </div>
            <div className="item-card">
              <img src="smoking.png"/>
              <span>Churro sin azucar</span>
            </div>
          </div>
        </section>

        <section className="store-items-section">
          <h2>Objetos de Tienda</h2>
          <div className="item-grid">
            <div className="item-card">
              <img src="Suqlento.png"/>
              <span>Estatua Sqlolento</span>
            </div>
            <div className="item-card">
              <img src="cocadepiña.png"/>
              <span>Coca de Piña</span>
            </div>
            <div className="item-card">
              <img src="rosa.png"/>
              <span>¿Y esta Rosa?</span>
            </div>
            <div className="item-card">
              <img src="censurado.png"/>
              <span>Censurado</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;