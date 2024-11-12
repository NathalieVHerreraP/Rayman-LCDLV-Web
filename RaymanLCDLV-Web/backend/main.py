from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"*"}})
# Configura la conexión con MongoDB
uri = "mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/?retryWrites=true&w=majority&appName=Streaming"
client = MongoClient(uri)
db = client['rayman_store']
collection = db['marcadores']

# Endpoint para agregar un marcador
@app.route('/addScore', methods=['POST'])
def add_score():
    data = request.get_json()
    required_fields = ["Nombre", "Tiempo", "Descripcion", "Estrellas", "Imagen"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"El campo {field} es obligatorio"}), 400

    new_marker = {
        "Nombre": data["Nombre"],
        "Tiempo": data["Tiempo"],
        "Descripcion": data["Descripcion"],
        "Estrellas": data["Estrellas"],
        "Imagen": data["Imagen"]
    }

    try:
        result = collection.insert_one(new_marker)
        return jsonify({"_id": str(result.inserted_id), "message": "Marcador agregado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": "No se pudo agregar el marcador", "detalle": str(e)}), 500

# Endpoint para obtener los primeros 4 marcadores
@app.route('/getTopScores', methods=['GET'])
def get_top_scores():
    top_scores = collection.find().limit(4)
    result = []
    for score in top_scores:
        result.append({
            "_id": str(score["_id"]),
            "Nombre": score["Nombre"],
            "Tiempo": score["Tiempo"],
            "Descripcion": score["Descripcion"],
            "Estrellas": score["Estrellas"],
            "Imagen": score["Imagen"]
        })
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000, debug=True, threaded=True)