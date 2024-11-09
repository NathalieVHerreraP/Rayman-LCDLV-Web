import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Marcadores.css';

const Marcadores = ({ newPlayer }) => {
  const [jugadores, setJugadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getTopScores'); // Asegúrate de que el puerto sea correcto
        const data = await response.json();
        setJugadores(data);
      } catch (error) {
        console.error('Error al obtener marcadores:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (newPlayer) {
      setJugadores((prevJugadores) => [newPlayer, ...prevJugadores.slice(0, 3)]);
    }
  }, [newPlayer]);

  const handleCardClick = (jugador) => {
    navigate(`/jugador/${jugador._id}`, { state: jugador });
  };

  return (
    <div className="marcadores">
      <section className="collectibles-sect">
        <h2 className="section-title">Recientes</h2>
      </section>
      <div className="jugadores-grid">
        {jugadores.map((jugador) => (
          <div
            className="jugador-card"
            key={jugador._id}
            onClick={() => handleCardClick(jugador)}
          >
            <img src={jugador.Imagen || "User.png"} alt={`Jugador ${jugador._id}`} className="jugador-imagen" />
            <span><strong>{jugador.Nombre}</strong></span>
            <p>Tiempo: {jugador.Tiempo}</p>
            <p>Estrellas: {'★'.repeat(jugador.Estrellas)}{'☆'.repeat(5 - jugador.Estrellas)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marcadores;