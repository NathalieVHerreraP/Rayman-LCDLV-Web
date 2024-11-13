const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas o Compass
mongoose.connect('mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/rayman-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Esquema y modelo de Producto
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String
});
const Product = mongoose.model('Product', productSchema);

// Esquema y modelo de Jugador
const PlayerSchema = new mongoose.Schema({
  Nombre: String,
  Tiempo: String,
  Descripcion: String,
  Estrellas: Number,
  Imagen: String
});
const Player = mongoose.model('Player', PlayerSchema);

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// Ruta para procesar el carrito y simular la compra
app.post('/api/cart/purchase', async (req, res) => {
  const { cartItems, totalAmount } = req.body;

  // Aquí podrías procesar el pedido en la base de datos si deseas.
  
  // Lógica para crear una orden en PayPal
  const orderId = "paypal_order_id"; // Simula un ID de orden de PayPal
  res.json({ orderId });
});

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

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor en ejecución en http://localhost:${PORT}`));