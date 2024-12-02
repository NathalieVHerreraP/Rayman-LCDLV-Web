import { addNotification } from "react-push-notification";

export const initializePushNotifications = () => {
  // Simula una notificación push al cargar la página
  addNotification({
    title: "¡Hola!",
    subtitle: "Notificación importante",
    message: "Inicia sesión para tener una experiencia más satisfactoria.",
    theme: "darkblue",
    native: true, // Intentar mostrar la notificación como nativa si es posible
    duration: 5000, // 5 segundos
    icon: "/Logo2.png", // Icono de la notificación
  });
};

export const showCustomNotification = (message) => {
  addNotification({
    title: "Aviso",
    subtitle: "Información",
    message,
    theme: "light",
    native: true,
    icon: "/Logo2.png",
  });
};