import React, { useEffect, useState } from 'react';
import './Marcadores.css'; // Asegúrate de que el archivo CSS esté en el mismo directorio

// Simulación de llamada a base de datos con MongoDB (esto puede ser reemplazado con un fetch real)
const obtenerMarcadores = async () => {
  // Aquí deberías conectar a tu base de datos y retornar los datos
  // Este código simula una llamada a la base de datos y devuelve datos ficticios
  return [
    { id: 1, nombre: 'Jugador 1', tiempo: '2:52:32', estrellas: 3 },
    { id: 2, nombre: 'Jugador 2', tiempo: '2:52:32', estrellas: 4 },
    { id: 3, nombre: 'Jugador 3', tiempo: '2:52:32', estrellas: 3 },
    { id: 4, nombre: 'Jugador 4', tiempo: '2:52:32', estrellas: 4 }
  ];
};

const Marcadores = () => {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerMarcadores();
      setJugadores(data);
    };

    fetchData();
  }, []);

  return (
    <div className="marcadores">
      <header>
        <h1>Recientes</h1>
      </header>
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