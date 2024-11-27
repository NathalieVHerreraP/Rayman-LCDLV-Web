const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB Atlas o Compass usando variable de entorno
const dbURI = process.env.MONGO_URI || 'mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/rayman-store';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Esquema y modelo de Jugador
const PlayerSchema = new mongoose.Schema({
  Nombre: String,
  Tiempo: String,
  Descripcion: String,
  Estrellas: Number,
  Imagen: String
});
const Player = mongoose.model('Player', PlayerSchema);

// Esquema y modelo de Producto
const ProductoSchema = new mongoose.Schema({
  Descripcion: String,
  Imagen: String,
  Nombre: String,
  Precio: String
});
const Producto = mongoose.model('Producto', ProductoSchema);

// Rutas
// Obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos', details: error.message });
  }
});

// Agregar un jugador
app.post('/addScore', async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(200).json({ message: 'Jugador agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el jugador', details: error.message });
  }
});

// Eliminar un marcador
app.delete('/deleteScore/:id', async (req, res) => {
  try {
    const playerId = req.params.id;
    const deletedPlayer = await Player.findByIdAndDelete(playerId);

    if (!deletedPlayer) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }

    res.status(200).json({ message: 'Jugador eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el jugador', details: error.message });
  }
});

// --- Endpoints Usuarios ---
// Definir colección de usuarios
const usuariosCollection = mongoose.connection.collection('usuarios');

// Registrar un nuevo usuario
app.post('/register', async (req, res) => {
  try {
    const { nombre, email, edad, password, imagen } = req.body;

    // Verificar si el correo ya está registrado
    const existingUser = await usuariosCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Crear el usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      nombre,
      email,
      edad,
      password: hashedPassword,
      imagen
    };
    await usuariosCollection.insertOne(newUser);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (e) {
    res.status(500).json({ error: 'Error al registrar usuario', details: e.message });
  }
});

// Iniciar sesión de usuario
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario en la base de datos
    const user = await usuariosCollection.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      // Generar token JWT
      const token = jwt.sign(
        { id: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 10) },
        process.env.SECRET_KEY, { algorithm: 'HS256' }
      );
      return res.status(200).json({
        token,
        user: {
          id: user._id,
          nombre: user.nombre,
          email: user.email,
          edad: user.edad,
          imagen: user.imagen || 'default.jpg'
        }
      });
    }
    return res.status(401).json({ error: 'Credenciales inválidas' });
  } catch (e) {
    res.status(500).json({ error: 'Error en el inicio de sesión', details: e.message });
  }
});

// Listar todos los usuarios
app.get('/list-users', async (req, res) => {
  try {
    const users = await usuariosCollection.find({}, { projection: { password: 0 } }).toArray();
    users.forEach(user => {
      user._id = user._id.toString();
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: 'Error al obtener usuarios', details: e.message });
  }
});

// Obtener información de un usuario específico
app.get('/get-user/:id', async (req, res) => {
  try {
    const user = await usuariosCollection.findOne({ _id: ObjectId(req.params.id) });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    user._id = user._id.toString();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: 'Error al obtener usuario', details: e.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor en ejecución en http://localhost:${PORT}`));