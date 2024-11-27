import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [password, setPassword] = useState('');
  const [imagen, setImagen] = useState(null); // Cambiar el estado a un archivo

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/login' : '/register';

    const formData = new FormData();
    if (!isLogin) {
      formData.append('nombre', nombre);
      formData.append('edad', edad);
      formData.append('imagen', imagen); // Añadir archivo al FormData
    }
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`http://localhost:5000${url}`, {
      method: 'POST',
      body: formData, // Usar FormData en lugar de JSON
    });
    const data = await response.json();

    if (response.ok) {
      alert(isLogin ? 'Inicio de sesión exitoso' : 'Registro exitoso');
      if (isLogin) onLogin(data);
    } else {
      alert(data.error || 'Ocurrió un error');
    }
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]); // Asignar archivo seleccionado
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h1>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="number"
                placeholder="Edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange} // Manejar archivo
              />
            </>
          )}
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
        <p className="toggle-form" onClick={toggleForm}>
          {isLogin
            ? '¿No tienes cuenta? Regístrate'
            : '¿Ya tienes cuenta? Inicia sesión'}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;