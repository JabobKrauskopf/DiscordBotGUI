from flask import Flask, jsonify
from flask_cors import CORS
import bot_lib.bot as bot

app = Flask(__name__)
CORS(app)


@app.route("/connect_to_voice")
def connect():
    print("connect")
    return jsonify({"error": False, "status": "connected"})


@app.route("/disconnect_to_voice")
def disconnect():
    print("disconnect")
    return jsonify({"error": False, "status": "disconnected"})


@app.route("/get_all_channels")
def get_all_channels():
    response = []
    for channel in list(bot.get_all_channels()):
        response.append(
            {
                "type": str(type(channel).__name__),
                "name": str(channel.name),
                "id": int(channel.id),
            }
        )
    return jsonify(response)


@app.route("/get_bot_status")
def get_bot_status():
    bot_status = bot.get_bot_status()
    return jsonify({"name": bot_status.name, "id": bot_status.id})
