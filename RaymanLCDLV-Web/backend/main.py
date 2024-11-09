from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

# Configura la conexión con MongoDB
uri = "mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/?retryWrites=true&w=majority&appName=Streaming"
client = MongoClient(uri)
db = client['rayman_store']
collection = db['marcadores']

# Endpoint para agregar o actualizar un marcador
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

    result = collection.update_one(
        {"Nombre": data["Nombre"]},
        {"$set": new_marker},
        upsert=True
    )

    if result.upserted_id:
        return jsonify({"_id": str(result.upserted_id), "message": "Marcador agregado con éxito"}), 201
    else:
        return jsonify({"message": "Marcador actualizado con éxito"}), 200

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
    app.run(port=5000, debug=True)