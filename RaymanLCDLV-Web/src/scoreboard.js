import React, { useState } from 'react';
import './scoreboard.css';

const Scoreboard = ({ onAddPlayer }) => {
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (playerName.trim() === '') return;

    const newPlayer = {
      id: Date.now(), // Unique ID
      name: playerName,
      time: new Date().toLocaleTimeString(), // Current time
      stars: 0
    };

    onAddPlayer(newPlayer);
    setPlayerName('');
  };

  return (
    <div className="scoreboard">
      <h1>Marcador</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Nombre del jugador"
      />
      <button onClick={handleAddPlayer}>Agregar Jugador</button>
    </div>
  );
};

export default Scoreboard;