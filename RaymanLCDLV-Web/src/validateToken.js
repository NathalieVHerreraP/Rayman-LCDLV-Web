import { getToken } from './tokenStorage';

export const validateToken = async () => {
  const token = await getToken();
  if (!token) return false;

  try {
    const response = await fetch('http://localhost:5000/validateToken', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return true; // Token válido
    } else {
      console.error('Token inválido');
      return false; // Token inválido
    }
  } catch (error) {
    console.error('Error al validar el token:', error);
    return false;
  }
};