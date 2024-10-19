from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

waiting_users = []  # List to store users waiting for a chat

@app.route('/')
def index():
    return "Socket.IO Server Running!"

@socketio.on('connect')
def handle_connect():
    # Emit the current waiting users to the newly connected client
    emit('waiting_users', waiting_users)

@socketio.on('message')
def handle_message(msg):
    print(f"Message received: {msg}")
    socketio.send(msg)  # Send the message with sender information back to all clients

@socketio.on('join_waiting_list')
def handle_join_waiting_list(user_id):
    if user_id not in waiting_users:
        waiting_users.append(user_id)  # Add the user to the waiting list
        socketio.emit('waiting_users', waiting_users)  # Notify all clients of the updated list

@socketio.on('leave_waiting_list')
def handle_leave_waiting_list(user_id):
    print(user_id)
    if user_id in waiting_users:
        waiting_users.remove(user_id)  # Remove the user from the waiting list
        socketio.emit('waiting_users', waiting_users)  # Notify all clients of the updated list

    print(waiting_users)

if __name__ == '__main__':
    socketio.run(app, debug=True)
