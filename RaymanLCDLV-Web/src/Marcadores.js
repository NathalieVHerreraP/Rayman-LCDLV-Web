import React, { useEffect, useState } from 'react';
import './Marcadores.css'; // Asegúrate de que el archivo CSS esté en el mismo directorio

const obtenerMarcadores = async () => {
  return [
    { id: 1, nombre: 'Jugador 1', tiempo: '2:52:32', estrellas: 3 },
    { id: 2, nombre: 'Jugador 2', tiempo: '2:52:32', estrellas: 4 },
    { id: 3, nombre: 'Jugador 3', tiempo: '2:52:32', estrellas: 3 },
    { id: 4, nombre: 'Jugador 4', tiempo: '2:52:32', estrellas: 4 }
  ];
};

const Marcadores = ({ newPlayer }) => {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerMarcadores();
      setJugadores(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (newPlayer) {
      setJugadores((prevJugadores) => [newPlayer, ...prevJugadores]);
    }
  }, [newPlayer]);

  return (
    <div className="marcadores">
      <section className="collectibles-section">
        <h2 className="section-title">Recientes</h2> {/* Estilo aplicado */}
      </section>
      <div className="jugadores-grid">
        {jugadores.map((jugador) => (
          <div className="jugador-card" key={jugador.id}>
            <img src="User.png" alt={`Jugador ${jugador.id}`} className="jugador-imagen" />
            <h2>{jugador.nombre}</h2>
            <p>Tiempo: {jugador.tiempo}</p>
            <p>Estrellas: {'★'.repeat(jugador.estrellas)}{'☆'.repeat(5 - jugador.estrellas)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marcadores;