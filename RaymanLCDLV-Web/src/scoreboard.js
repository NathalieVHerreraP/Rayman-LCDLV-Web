import React, { useState } from 'react';
import './scoreboard.css';

const Scoreboard = ({ onAddPlayer }) => {
  const [playerName, setPlayerName] = useState('');
  const [duration, setDuration] = useState('');
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [image, setImage] = useState(null);

  const handleAddPlayer = async () => {
    if (playerName.trim() === '' || duration.trim() === '' || stars === 0 || !image) return;
  
    const newPlayer = {
      Nombre: playerName,
      Tiempo: duration,
      Descripcion: review,
      Estrellas: stars,
      Imagen: image
    };
  
    console.log("Datos a enviar:", newPlayer); // Verifica los datos a enviar
  
    try {
      const response = await fetch('http://localhost:5000/addScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlayer)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log("Respuesta del servidor:", result); // Verifica la respuesta
        onAddPlayer(newPlayer);
        setPlayerName('');
        setDuration('');
        setReview('');
        setStars(0);
        setImage(null);
      } else {
        console.error("Error al agregar o actualizar marcador");
      }
    } catch (error) {
      console.error("Error al enviar el marcador a la API:", error);
    }
  };    

  // Función para convertir la imagen a Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Guarda la imagen en formato Base64
      };
      reader.readAsDataURL(file); // Convierte la imagen a Base64
    }
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
  <input
    type="text"
    placeholder="Selecciona estrellas (1-5)"
    value={stars}
    onChange={(e) => {
      const value = parseInt(e.target.value);
      // Validar que el valor esté entre 1 y 5 o vacío
      if (!isNaN(value) && value >= 1 && value <= 5) {
        setStars(value);
      } else if (e.target.value === '') {
        setStars('');
      }
    }}
  />
  <span>
    {"★".repeat(stars)}
  </span>
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