import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Marcadores.css';

const Marcadores = ({ newPlayer }) => {
  const [jugadores, setJugadores] = useState([]); // Jugadores para mostrar los primeros 4
  const [todosLosMarcadores, setTodosLosMarcadores] = useState([]); // Todos los marcadores
  const [mostrarTodos, setMostrarTodos] = useState(false); // Controlar si se deben mostrar todos los marcadores
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getTopScores');
        const data = await response.json();
        setJugadores(data); // Obtiene los primeros 4 marcadores
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

  // Función para obtener todos los marcadores
  const obtenerTodosMarcadores = async () => {
    try {
      const response = await fetch('http://localhost:5000/getTopScores');
      const data = await response.json();
      setTodosLosMarcadores(data); // Guardar todos los marcadores
      setMostrarTodos(true); // Mostrar todos los marcadores
    } catch (error) {
      console.error('Error al obtener todos los marcadores:', error);
    }
  };

  const handleCardClick = (jugador) => {
    navigate(`/jugador/${jugador._id}`, { state: jugador });
  };

  const handleDelete = async (id) => {
    try {
      // Llamada a la API para eliminar el marcador en el backend y la base de datos
      const response = await fetch(`http://localhost:5000/deleteScore/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Eliminamos el marcador del estado local si la solicitud es exitosa
        setJugadores((prevJugadores) => prevJugadores.filter((jugador) => jugador._id !== id));
        setTodosLosMarcadores((prevJugadores) => prevJugadores.filter((jugador) => jugador._id !== id));
      } else {
        console.error('Error al eliminar marcador en el servidor');
      }
    } catch (error) {
      console.error('Error al eliminar marcador:', error);
    }
  };

  return (
    <div className="marcadores">
      <section className="collectibles-sect">
        <h2 className="section-title">Recientes</h2>
      </section>
      
      {/* Mostrar los primeros 4 jugadores */}
      <div className="jugadores-grid">
        {jugadores.map((jugador) => (
          <div className="jugador-card" key={jugador._id} onClick={() => handleCardClick(jugador)}>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation(); // Evita que el evento se propague al card
                handleDelete(jugador._id);
              }}
            >
              ✕
            </button>
            <img src={jugador.Imagen || "User.png"} alt={`Jugador ${jugador._id}`} className="jugador-imagen" />
            <span><strong>{jugador.Nombre}</strong></span>
            <p>Tiempo: {jugador.Tiempo}</p>
            <p>Estrellas: {'★'.repeat(jugador.Estrellas)}{'☆'.repeat(5 - jugador.Estrellas)}</p>
          </div>
        ))}
      </div>

      {/* Botón para mostrar todos los marcadores */}
      <button className="mostrar-todos-button" onClick={obtenerTodosMarcadores}>
        Mostrar todos los marcadores
      </button>

      {/* Mostrar todos los marcadores si el estado 'mostrarTodos' es true */}
      {mostrarTodos && (
        <div className="jugadores-grid">
          {todosLosMarcadores.map((jugador) => (
            <div className="jugador-card" key={jugador._id} onClick={() => handleCardClick(jugador)}>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el evento se propague al card
                  handleDelete(jugador._id);
                }}
              >
                ✕
              </button>
              <img src={jugador.Imagen || "User.png"} alt={`Jugador ${jugador._id}`} className="jugador-imagen" />
              <span><strong>{jugador.Nombre}</strong></span>
              <p>Tiempo: {jugador.Tiempo}</p>
              <p>Estrellas: {'★'.repeat(jugador.Estrellas)}{'☆'.repeat(5 - jugador.Estrellas)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marcadores;