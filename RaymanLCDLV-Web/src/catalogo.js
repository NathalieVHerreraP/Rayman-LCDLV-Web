import React from 'react';
import '../src/catalogo.css'; // Asegúrate de agregar tus estilos CSS aquí

const Catalogo = () => {
  return (

      <main className="main-content">

      <section class="collectibles-section">
  <h2 class="section-title">Peluches</h2>
  <div class="item-grid">
    <div class="item-card">
      <img src="luka.png"/>
      <span><strong>Luka</strong></span>
    </div>
    <div class="item-card">
      <img src="PelucheRayman.png"/>
      <span><strong>Rayman <p>(las extremidades se venden por separado)</p></strong></span>
    </div>
    <div class="item-card">
      <img src="churro.png"/>
      <span><strong>Churro</strong></span>
    </div>
    <div class="item-card">
      <img src="User.png"/>
      <span><strong>Algo</strong></span>
    </div>
  </div>
</section>

<section class="store-items-section">
  <h2 class="section-title">Figuras coleccionables</h2>
  <div class="item-grid">
    <div class="item-card">
      <img src="raymandes.png"/>
      <span><strong>Rayman encuerado</strong></span>
    </div>
    <div class="item-card">
      <img src="luka2.png"/>
      <span><strong>Luka chikito</strong></span>
    </div>
    <div class="item-card">
      <img src="Suqlento.png"/>
      <span><strong>Figura SuQloLento</strong></span>
    </div>
    <div class="item-card">
      <img src="Llavero.png"/>
      <span><strong>Llavero</strong></span>
    </div>
  </div>
</section>
      </main>
  );
};

export default Catalogo;