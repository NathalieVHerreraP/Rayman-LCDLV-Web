import React, { useState, useEffect } from "react";
import "./UserProfile.css";

const UserProfile = ({ user = { id: "", nombre: "", email: "" } }) => {
  const [name, setName] = useState(user.nombre);
  const [email, setEmail] = useState(user.email); // Agregado el estado del correo
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user.nombre) {
      setName(user.nombre);
    }
    if (user.email) {
      setEmail(user.email); // Inicializar con el correo del usuario si está disponible
    }
  }, [user]);

  const handleSavePassword = async () => {
    if (!email || !password) {
      alert("El correo y la contraseña no pueden estar vacíos.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("http://localhost:5000/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email, // Ahora usa el correo ingresado
          passw: password, // La nueva contraseña
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Contraseña actualizada exitosamente");
        setPassword(""); // Limpiar el campo de la contraseña
      } else {
        alert(data.error || "Error al actualizar la contraseña");
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return <div>Cargando información del usuario...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <h1>Actualizar Contraseña</h1>
        {/* Campo para el correo */}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Campo para la nueva contraseña */}
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSavePassword} disabled={isSaving}>
          {isSaving ? "Guardando..." : "Actualizar Contraseña"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;