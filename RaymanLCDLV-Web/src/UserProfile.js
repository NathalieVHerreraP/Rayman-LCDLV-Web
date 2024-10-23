import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [image, setImage] = useState('user-logged-in.png'); // Imagen actual
  const [password, setPassword] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    // Lógica para cambiar contraseña (podrías hacer una petición a la API)
    /*
      fetch('https://api.example.com/change-password', {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Contraseña actualizada correctamente');
        }
      });
    */
    alert('Contraseña actualizada correctamente');
  };

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
      <div className="image-section">
        <img src={image} alt="Usuario" className="profile-image" />
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className="password-section">
        <input 
          type="password" 
          placeholder="Nueva Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handlePasswordChange}>Cambiar Contraseña</button>
      </div>
    </div>
  );
};

export default UserProfile;