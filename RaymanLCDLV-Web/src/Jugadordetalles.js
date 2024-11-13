import React from 'react';
import { useLocation } from 'react-router-dom';
import './Jugadordetalles.css';

const JugadorDetalles = () => {
  const location = useLocation();
  const jugador = location.state;

  return (
      <div className="detalles-card">
        <img src={jugador.Imagen || 'User.png'} alt={`Imagen de ${jugador.Nombre}`} className="jugador-imagen-detalle" />
        <h2 className="jugador-nombre">{jugador.Nombre}</h2>
        <div className="jugador-info">
          <p><strong>Tiempo:</strong> {jugador.Tiempo}</p>
          <p><strong>Estrellas:</strong> {'★'.repeat(jugador.Estrellas)}{'☆'.repeat(5 - jugador.Estrellas)}</p>
          <p className="descripcion-texto"><strong>Descripción:</strong> {jugador.Descripcion}</p>
        </div>
      </div>
  );
};

export default JugadorDetalles;