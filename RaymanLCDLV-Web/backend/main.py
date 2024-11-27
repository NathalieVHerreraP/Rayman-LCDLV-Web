from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import jwt
import logging
from pymongo.errors import ConfigurationError, ConnectionFailure

# Habilita los logs de depuración
logging.basicConfig(level=logging.DEBUG)

# Cargar variables de entorno
load_dotenv()

# Configuración de la aplicación Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', '142536')  # Configura tu clave secreta aquí
CORS(app, resources={r"/*": {"origins": "*"}})

# Carpeta para almacenar imágenes
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Crea la carpeta si no existe

# Configura la conexión con MongoDB
uri = os.getenv("MONGO_URI") or "mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/rayman-store?retryWrites=true&w=majority&appName=Streaming"

# Variable para la conexión y base de datos
client = MongoClient('mongodb://localhost:27017/')
db = client['rayman-store']

# Intentar conectar a MongoDB y registrar posibles errores
try:
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)  # Timeout de 5 segundos
    db = client["rayman-store"]
    # Verifica si la conexión es exitosa
    client.admin.command('ping')
    logging.info("Conexión exitosa a MongoDB")
except ConfigurationError as ce:
    logging.error(f"Error de configuración: {ce}")
except ConnectionFailure as cf:
    logging.error(f"Fallo de conexión: {cf}")
except Exception as e:
    logging.error(f"Error inesperado: {e}")

# Si no se pudo conectar, detén la ejecución
if db is None:
    logging.error("No se pudo conectar a la base de datos. La aplicación no se iniciará.")
    exit(1)

# Colecciones de la base de datos
collection = db['marcadores']
productos_collection = db['productos']
usuarios_collection = db['usuarios']

# --- Endpoints Marcadores-Productos---

@app.route('/addScore', methods=['POST'])
def add_score():
    data = request.get_json()
    required_fields = ["Nombre", "Tiempo", "Descripcion", "Estrellas", "Imagen"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"El campo {field} es obligatorio"}), 400

    try:
        result = collection.insert_one(data)
        return jsonify({"_id": str(result.inserted_id), "message": "Marcador agregado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": "Error al agregar marcador", "detalle": str(e)}), 500

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = list(productos_collection.find({}))
        for product in products:
            product['_id'] = str(product['_id'])  # Convierte ObjectId a string
        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": "Error al obtener productos", "detalle": str(e)}), 500

from pymongo import MongoClient

# Conectar con MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['nombre_de_tu_base_de_datos']  # Reemplaza por el nombre de tu base de datos
productos_collection = db['productos']  # Nombre de la colección

# Productos a insertar
productos = [
    {
        "_id": "6734c1c5f4e37d5ec0014e30",
        "Descripcion": "Peluche de churro con aroma dulce",
        "Imagen": "/public/churro.png",
        "Nombre": "Churro",
        "Precio": "$10"
    },
    {
        "_id": "6734c1ebf4e37d5ec0014e34",
        "Descripcion": "Figura exclusiva de SuQloLento",
        "Imagen": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAA…",
        "Nombre": "Figura SuQloLento",
        "Precio": "$25"
    },
    {
        "_id": "6734c1ebf4e37d5ec0014e35",
        "Descripcion": "Llavero decorativo",
        "Imagen": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiUAAAGnCAYAAABo/SelAAAA…",
        "Nombre": "Llavero",
        "Precio": "$5"
    },
    {
        "_id": "6734c1c5f4e37d5ec0014e2f",
        "Descripcion": "Rayman con extremidades desmontables",
        "Imagen": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAAEDCAYAAAAx0WHLAAAA…",
        "Nombre": "Rayman",
        "Precio": "$18"
    },
    {
        "_id": "6734c1c5f4e37d5ec0014e2e",
        "Descripcion": "Peluche suave y esponjoso de Luka",
        "Imagen": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXcAAAKaCAYAAADF8hk/AAAA…",
        "Nombre": "Luka",
        "Precio": "$15"
    },
    {
        "_id": "6734c1c5f4e37d5ec0014e31",
        "Descripcion": "Un peluche refrescante",
        "Imagen": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAA…",
        "Nombre": "Agua de piña",
        "Precio": "$8"
    },
    {
        "_id": "6734c1ebf4e37d5ec0014e33",
        "Descripcion": "Mini figura de Luka",
        "Imagen": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAAD7CAYAAADAdLCjAAAA…",
        "Nombre": "Luka chikito",
        "Precio": "$12"
    },
    {
        "_id": "6734c1ebf4e37d5ec0014e32",
        "Descripcion": "Figura coleccionable de Rayman",
        "Imagen": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAb8AAAIuCAYAAAAvwQYJAAAA…",
        "Nombre": "Rayman",
        "Precio": "$20"
    }
]

# Insertar productos en la colección
try:
    productos_collection.insert_many(productos)
    print("Productos insertados correctamente")
except Exception as e:
    print(f"Error al insertar productos: {e}")


@app.route('/getTopScores', methods=['GET'])
def get_top_scores():
    try:
        top_scores = list(collection.find().limit(4))
        for score in top_scores:
            score['_id'] = str(score['_id'])  # Convierte ObjectId a string
        return jsonify(top_scores), 200
    except Exception as e:
        return jsonify({"error": "Error al obtener marcadores", "detalle": str(e)}), 500

@app.route('/deleteScore/<id>', methods=['DELETE'])
def delete_score(id):
    try:
        result = collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count > 0:
            return jsonify({"message": "Marcador eliminado con éxito"}), 200
        else:
            return jsonify({"error": "Marcador no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": "Error al eliminar marcador", "detalle": str(e)}), 500

# --- Endpoints Usuarios---

@app.route('/register', methods=['POST'])
def register():
    """Registrar un nuevo usuario."""
    try:
        nombre = request.form.get('nombre')
        email = request.form.get('email')
        edad = request.form.get('edad')
        password = request.form.get('password')

        # Manejo de archivo de imagen
        imagen_path = ''
        if 'imagen' in request.files:
            imagen_file = request.files['imagen']
            if imagen_file.filename != '':
                filename = secure_filename(imagen_file.filename)
                imagen_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                imagen_file.save(imagen_path)

        # Verificar si el correo ya está registrado
        if usuarios_collection.find_one({'email': email}):
            return jsonify({'error': 'El correo ya está registrado'}), 400

        # Crear el usuario
        hashed_password = generate_password_hash(password)
        new_user = {
            'nombre': nombre,
            'email': email,
            'edad': edad,
            'password': hashed_password,
            'imagen': imagen_path
        }
        usuarios_collection.insert_one(new_user)
        return jsonify({'message': 'Usuario registrado exitosamente'}), 201
    except Exception as e:
        return jsonify({'error': 'Error al registrar usuario', 'detalle': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    """Iniciar sesión de usuario."""
    try:
        if request.is_json:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
        else:
            email = request.form.get('email')
            password = request.form.get('password')

        # Buscar usuario en la base de datos
        user = usuarios_collection.find_one({'email': email})
        if user and check_password_hash(user['password'], password):
            # Generar token JWT
            token = jwt.encode(
                {'id': str(user['_id']), 'exp': datetime.utcnow() + timedelta(hours=1)},
                app.config['SECRET_KEY'], algorithm='HS256'
            )
            user_image = user.get('imagen', 'default.jpg')
            return jsonify({
                'token': token,
                'user': {
                    'id': str(user['_id']),
                    'nombre': user['nombre'],
                    'email': user['email'],
                    'edad': user['edad'],
                    'imagen': user_image
                }
            }), 200

        return jsonify({'error': 'Credenciales inválidas'}), 401

    except Exception as e:
        return jsonify({'error': 'Error en el inicio de sesión', 'detalle': str(e)}), 500

@app.route('/list-users', methods=['GET'])
def list_users():
    """Listar todos los usuarios registrados."""
    try:
        users = list(usuarios_collection.find({}, {"password": 0}))  # No mostrar contraseñas
        for user in users:
            user['_id'] = str(user['_id'])
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": "Error al obtener usuarios", "detalle": str(e)}), 500

# Endpoint para actualizar contraseña
@app.route('/update-password', methods=['PUT'])
def update_password():
    try:
        data = request.json
        email = data.get('correo')
        new_password = data.get('passw')

        if not email or not new_password:
            return jsonify({"error": "El correo y la nueva contraseña son obligatorios"}), 400

        # Hash de la nueva contraseña
        hashed_password = generate_password_hash(new_password)

        # Actualización en la base de datos
        result = usuarios_collection.update_one(
            {"email": email}, 
            {"$set": {"password": hashed_password}}
        )

        if result.matched_count > 0:
            return jsonify({"message": "Contraseña actualizada con éxito"}), 200
        else:
            return jsonify({"error": "Usuario no encontrado"}), 404

    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "detalle": str(e)}), 500

# --- Endpoints Carrito--- 
# --- Endpoint de PayPal --- 
@app.route('/api/paypal/checkout', methods=['POST'])
def paypal_checkout():
    from paypalcheckoutsdk.orders import OrdersCreateRequest
    from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment

    client_id = os.getenv("PAYPAL_CLIENT_ID")
    client_secret = os.getenv("PAYPAL_SECRET")
    environment = SandboxEnvironment(client_id=client_id, client_secret=client_secret)
    client = PayPalHttpClient(environment)

    data = request.get_json()
    items = data.get("items", [])

    try:
        total_value = sum(float(item["price"]) * item["quantity"] for item in items)
        request_order = OrdersCreateRequest()
        request_order.prefer('return=representation')
        request_order.request_body({
            "intent": "CAPTURE",
            "purchase_units": [{"amount": {"currency_code": "USD", "value": str(total_value)}}],
            "application_context": {"return_url": "http://localhost:5000/success", "cancel_url": "http://localhost:5000/cancel"}
        })

        response = client.execute(request_order)
        return jsonify({"approval_url": response.result.links[1].href}), 200

    except Exception as e:
        logging.error(f"Error en la creación del pago PayPal: {str(e)}")
        return jsonify({"error": "Error al procesar pago"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=True)