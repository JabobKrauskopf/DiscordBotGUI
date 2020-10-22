from flask import Flask
app = Flask(__name__)


@app.route('/connect')
def connect():
    print("connect")
    return "conntect"


@app.route('/disconnect')
def disconnect():
    print("disconnect")
    return "disconnect"
