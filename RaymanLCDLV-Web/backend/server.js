const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Conecta con MongoDB usando el string de conexión de MongoDB Atlas o Compass
mongoose.connect('mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/rayman-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Define un esquema y modelo
const PlayerSchema = new mongoose.Schema({
  Nombre: String,
  Tiempo: String,
  Descripcion: String,
  Estrellas: Number,
  Imagen: String
});

const Player = mongoose.model('Player', PlayerSchema);

// Ruta para agregar un jugador
app.post('/addScore', async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(200).json({ message: 'Jugador agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el jugador' });
  }
});

app.listen(PORT, () => console.log(`Servidor en ejecución en http://localhost:${PORT}`));