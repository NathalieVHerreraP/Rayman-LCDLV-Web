import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Importa el hook para navegar entre páginas
import './Marcadores.css'; // Asegúrate de que el archivo CSS esté en el mismo directorio

// Simula la obtención de datos. Esto se reemplazaría por una llamada a tu API conectada con MongoDB.
const obtenerMarcadores = async () => {
  return [
    { id: 1, nombre: 'Jugador 1', tiempo: '2:52:32', estrellas: 3, descripcion: 'Descripción del Jugador 1' },
    { id: 2, nombre: 'Jugador 2', tiempo: '2:52:32', estrellas: 4, descripcion: 'Descripción del Jugador 2' },
    { id: 3, nombre: 'Jugador 3', tiempo: '2:52:32', estrellas: 3, descripcion: 'Descripción del Jugador 3' },
    { id: 4, nombre: 'Jugador 4', tiempo: '2:52:32', estrellas: 4, descripcion: 'Descripción del Jugador 4' }
  ];
};

const Marcadores = ({ newPlayer }) => {
  const [jugadores, setJugadores] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir

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

  // Maneja la redirección al hacer clic en un jugador
  const handleCardClick = (jugador) => {
    // Redirige a una página de detalles del jugador, pasando los datos como estado
    navigate(`/jugador/${jugador.id}`, { state: jugador });
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
            key={jugador.id}
            onClick={() => handleCardClick(jugador)}
          >
            <img src="User.png" alt={`Jugador ${jugador.id}`} className="jugador-imagen" />
            <span><strong>{jugador.nombre}</strong></span>
            <p>Tiempo: {jugador.tiempo}</p>
            <p>Estrellas: {'★'.repeat(jugador.estrellas)}{'☆'.repeat(5 - jugador.estrellas)}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Marcadores;