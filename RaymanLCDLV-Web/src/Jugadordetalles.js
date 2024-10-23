import React from 'react';
import { useLocation } from 'react-router-dom'; // Para acceder al estado de la navegación
import './Jugadordetalles.css';

const JugadorDetalles = () => {
  const location = useLocation();
  const jugador = location.state; // Obtén los datos del jugador desde el estado

  return (
    <div className="detalles-card"> {/* Aplicar la clase de la tarjeta */}
      <h1>Detalles del Jugador</h1>
      <h2>{jugador.nombre}</h2>
      <p>Tiempo: {jugador.tiempo}</p>
      <p>Estrellas: {'★'.repeat(jugador.estrellas)}{'☆'.repeat(5 - jugador.estrellas)}</p>
      <p>Descripción: {jugador.descripcion}</p>
    </div>
  );
};

export default JugadorDetalles;