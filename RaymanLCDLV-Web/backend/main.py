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

# Configura la conexión con MongoDB Compass
uri = "mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/?retryWrites=true&w=majority&appName=Streaming"
client = MongoClient(uri)
db = client.rayman_store  # Base de datos
usuarios_collection = db.usuarios  # Colección de usuarios
collection = db.marcadores  # Colección de puntajes
productos_collection = db.productos

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

# --- Endpoints Usuarios ---
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

        hashed_password = generate_password_hash(new_password)

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

# --- Endpoint de PayPal ---
@app.route('/api/paypal/checkout', methods=['POST'])
def paypal_checkout():
    data = request.get_json()
    items = data.get("items", [])

    if not items:
        return jsonify({"error": "No se enviaron productos"}), 400

    try:
        total_value = sum(
            float(item["Precio"].replace("$", "")) * item.get("quantity", 1)
            for item in items if "Precio" in item
        )

        # Simular la creación de una orden en PayPal (esto debería conectarse con el API de PayPal)
        return jsonify({"total_value": total_value}), 200

    except Exception as e:
        return jsonify({"error": "Error al crear orden", "detalle": str(e)}), 500

@app.route('/validateToken', methods=['POST'])
def validate_token():
    token = request.headers.get('Authorization')
    
    if not token or not token.startswith("Bearer "):
        return jsonify({"error": "Token no proporcionado"}), 401

    # Quitar el prefijo "Bearer "
    token = token.split(" ")[1]

    try:
        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({"message": "Token válido", "user_data": decoded_token}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expirado"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Token inválido"}), 401

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=True)