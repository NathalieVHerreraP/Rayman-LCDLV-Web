import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password, name };

    if (isLogin) {
      onLogin(userData); // Llamar la función de login del componente App
    } else {
      // Aquí podrías realizar una petición de registro
      /*
        fetch('https://api.example.com/register', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            onLogin(userData); // Llamar la función de login tras un registro exitoso
          }
        });
      */
      onLogin(userData); // Simulación de login tras registro
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h1>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Nombre" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
          )}
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Correo Electrónico" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
        </form>
        <p onClick={toggleForm} className="toggle-form">
          {isLogin ? '¿No tienes una cuenta? Regístrate aquí' : '¿Ya tienes una cuenta? Inicia sesión aquí'}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;