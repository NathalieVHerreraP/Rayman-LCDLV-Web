import React, { useState } from 'react';
import './scoreboard.css';

const Scoreboard = ({ onAddPlayer }) => {
  const [playerName, setPlayerName] = useState('');
  const [duration, setDuration] = useState('');
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [image, setImage] = useState(null);

  const handleAddPlayer = () => {
    if (playerName.trim() === '' || duration.trim() === '' || stars === 0 || !image) return;

    const newPlayer = {
      id: Date.now(), // Unique ID
      name: playerName,
      duration: duration,
      review: review,
      stars: stars,
      image: URL.createObjectURL(image) // Convertir imagen a una URL para mostrarla
    };

    onAddPlayer(newPlayer);
    setPlayerName('');
    setDuration('');
    setReview('');
    setStars(0);
    setImage(null);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Guardar la imagen seleccionada
  };

  return (
    <div className="scoreboard">
      <h1>Marcador</h1>
      
      {/* Nombre del jugador */}
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Nombre del jugador"
      />
      
      {/* Duración */}
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duración (por ejemplo: 2:30:45)"
      />
      
      {/* Reseña breve */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Escribe una breve reseña"
      />
      
      {/* Selección de estrellas */}
      <div>
        <label>Estrellas: </label>
        <select value={stars} onChange={(e) => setStars(parseInt(e.target.value))}>
          <option value={0}>Selecciona estrellas</option>
          <option value={1}>★</option>
          <option value={2}>★★</option>
          <option value={3}>★★★</option>
          <option value={4}>★★★★</option>
          <option value={5}>★★★★★</option>
        </select>
      </div>
      
      {/* Subir imagen */}
      <div>
        <label>Subir imagen de usuario: </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {/* Botón para agregar el marcador */}
      <button onClick={handleAddPlayer}>Agregar Marcador</button>
    </div>
  );
};

export default Scoreboard;