import React, { useState } from 'react';
import './AuthForm.css';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h1>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h1>
        <form>
          {!isLogin && (
            <div className="input-group">
              <input type="text" placeholder="Nombre" required />
            </div>
          )}
          <div className="input-group">
            <input type="email" placeholder="Correo Electrónico" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Contraseña" required />
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

export default LoginRegister;