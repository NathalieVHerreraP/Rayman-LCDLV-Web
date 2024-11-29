import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./scoreboard.css";

const Scoreboard = ({ isAuthenticated, onAddPlayer }) => {
  const [playerName, setPlayerName] = useState("");
  const [duration, setDuration] = useState("");
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddPlayer = async () => {
    if (!isAuthenticated) {
      navigate("/AuthForm");
      return;
    }

    if (
      playerName.trim() === "" ||
      duration.trim() === "" ||
      stars === 0 ||
      !image
    )
      return;

    const newPlayer = {
      Nombre: playerName,
      Tiempo: duration,
      Descripcion: review,
      Estrellas: stars,
      Imagen: image,
    };

    console.log("Datos a enviar:", newPlayer);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/addScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      console.log("Estado de la respuesta:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        if (onAddPlayer) onAddPlayer(newPlayer);
        setPlayerName("");
        setDuration("");
        setReview("");
        setStars(0);
        setImage(null);
        navigate("/marcadores");
      } else {
        const errorText = await response.text();
        console.error("Error al agregar marcador:", errorText);
      }
    } catch (error) {
      console.error("Error al enviar el marcador a la API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="scoreboard">
      <h1>Crear Marcador</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Nombre del jugador"
      />
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duración (por ejemplo: 2:30:45)"
      />
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Escribe una breve reseña"
      />
      <div>
        <label>Estrellas: </label>
        <input
          type="text"
          placeholder="Selecciona estrellas (1-5)"
          value={stars}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 1 && value <= 5) {
              setStars(value);
            } else if (e.target.value === "") {
              setStars("");
            }
          }}
        />
        <span> {"★".repeat(stars)} </span>
      </div>
      <div>
        <label>Subir imagen de usuario: </label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button
        className="add-player-button"
        onClick={handleAddPlayer}
        disabled={loading || !isAuthenticated}
      >
        {loading
          ? "Procesando..."
          : isAuthenticated
          ? "Agregar Marcador"
          : "Inicia sesión para agregar"}
      </button>
    </div>
  );
};

export default Scoreboard;