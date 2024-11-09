const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Para manejar JSON en las solicitudes

// Conexión a MongoDB
mongoose.connect('mongodb://http://localhost:5000/getTopScores', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB"))
.catch((err) => console.error("Error de conexión:", err));

// Definir esquema y modelo
const playerSchema = new mongoose.Schema({
  Nombre: String,
  Tiempo: String,
  Descripcion: String,
  Estrellas: Number,
  Imagen: String, // Imagen en Base64
});

const Player = mongoose.model('Player', playerSchema);

// Ruta para agregar un marcador
app.post('/addScore', async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json({ message: 'Marcador agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar marcador' });
  }
});

// Ruta para obtener los 4 marcadores más recientes
app.get('/marcadores', async (req, res) => {
  try {
    // Encuentra los documentos en la colección Player, ordena por fecha de creación en orden descendente y limita a 4 resultados
    const jugadores = await Player.find().sort({ _id: -1 }).limit(4);
    res.status(200).json(jugadores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener marcadores' });
  }
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});