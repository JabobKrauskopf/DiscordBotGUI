from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import bot_lib.bot as bot
import psycopg2
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

connection = psycopg2.connect(
    user=os.getenv("POSTGRES_USER"),
    password=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    port=os.getenv("POSTGRES_PORT"),
    database=os.getenv("POSTGRES_DATABASE"),
)

cursor = connection.cursor()

cursor.execute("SELECT token FROM app_public.bot WHERE id=1;")
record = cursor.fetchone()

botThread = None

if record[0]:
    botThread = bot.Threader(record[0])


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
    cursor.execute("SELECT name, token FROM app_public.bot WHERE id=1;")
    record = cursor.fetchone()
    return jsonify(
        {
            "name": record[0],
            "token": record[1],
            "status": "online" if botThread else "offline",
        }
    )


@app.route("/set_bot_status", methods=["GET", "POST"])
def set_bot_status():
    req_data = request.json
    botName = None
    token = None
    mainChannel = None
    try:
        botName = req_data["botName"]
        bot.rename(botName)
        cursor.execute(
            "UPDATE app_public.bot SET name='{0}' WHERE id=1;".format(botName)
        )
    except KeyError:
        pass
    try:
        token = req_data["token"]
        cursor.execute(
            "UPDATE app_public.bot SET token='{0}' WHERE id=1;".format(token)
        )
    except KeyError:
        pass
    try:
        mainChannel = req_data["mainChannel"]
        cursor.execute(
            "UPDATE app_public.bot SET main_channel='{0}' WHERE id=1;".format(
                int(mainChannel)
            )
        )
    except KeyError:
        pass
    connection.commit()
    return jsonify({"error": False, "status": "Changed name"})


@app.route("/start")
def start():
    global botThread
    cursor.execute("SELECT token FROM app_public.bot WHERE id=1;")
    record = cursor.fetchone()

    if record[0] and not botThread:
        botThread = bot.Threader(record[0])
    return jsonify({"error": False, "status": "Started"})


@app.route("/stop")
def stop():
    global botThread

    if botThread:
        botThread.loop.call_soon_threadsafe(botThread.loop.stop)
        botThread.join()
        botThread = None
    return jsonify({"error": False, "status": "Stopped"})
