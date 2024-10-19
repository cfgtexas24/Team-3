from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return "Socket.IO Server Running!"

@socketio.on('message')
def handle_message(msg):
    socketio.send(msg)  # Send the message with sender information back to all clients

if __name__ == '__main__':
    socketio.run(app, debug=True)