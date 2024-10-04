import React from 'react';
import '../src/catalogo.css'; // Asegúrate de agregar tus estilos CSS aquí

const Catalogo = () => {
  return (

      <main className="main-content">

      <section class="collectibles-section">
  <h2 class="section-title">Peluches</h2>
  <div class="item-grid">
    <div class="item-card">
      <img src="tepa.png"/>
      <span><strong>Luka</strong></span>
    </div>
    <div class="item-card">
      <img src="caguama.png"/>
      <span><strong>Rayman <p>(las extremidades se venden por separado)</p></strong></span>
    </div>
    <div class="item-card">
      <img src="tanga.png"/>
      <span><strong>Churro</strong></span>
    </div>
    <div class="item-card">
      <img src="tanga.png"/>
      <span><strong>Churro</strong></span>
    </div>
  </div>
</section>

<section class="store-items-section">
  <h2 class="section-title">Figuras coleccionables</h2>
  <div class="item-grid">
    <div class="item-card">
      <img src="Suqlento.png"/>
      <span><strong>Rayman encuerado</strong></span>
    </div>
    <div class="item-card">
      <img src="cocadepiña.png"/>
      <span><strong>Luka chikito</strong></span>
    </div>
    <div class="item-card">
      <img src="rosa.png"/>
      <span><strong>Figura SuQloLento</strong></span>
    </div>
    <div class="item-card">
      <img src="tanga.png"/>
      <span><strong>Churro</strong></span>
    </div>
  </div>
</section>
      </main>
  );
};

export default Catalogo;