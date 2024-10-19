from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# Initialize Flask app
app = Flask(__name__)

# Allow CORS (Cross-Origin Resource Sharing)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Socket.IO for real-time communication, allowing any origin
socketio = SocketIO(app, cors_allowed_origins="*")

# Database Configuration (Ideally, store credentials in environment variables)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL', 'postgresql://postgres.wvckutfciwyfmdkjjagv:0a3LSKB2A7NaMO9P@aws-0-us-east-1.pooler.supabase.com:6543/postgres')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# User model representing users in the system


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    is_mentor = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"User('{self.name}', '{self.email}', Mentor: {self.is_mentor})"


# List to store user IDs that are waiting for a chat
waiting_users = []


@app.route('/')
def index():
    """Serve the index route to indicate the server is running."""
    return "Socket.IO Server Running!"

# API Route to create a new user


@app.route('/create_user', methods=['POST'])
def create_user():
    """API route to create a new user in the system."""
    data = request.get_json()

    # Validate required fields
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({'error': 'Name and email are required.'}), 400

    # Retrieve the data from the request
    name = data.get('name')
    email = data.get('email')
    role = data.get('role')

    print(role)

    is_mentor = False
    if (role == 'Mentor'):
        is_mentor = True

    # Check if the email is already registered
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email is already in use.'}), 400

    # Create new user and add to the database
    new_user = User(name=name, email=email, is_mentor=is_mentor)
    db.session.add(new_user)
    db.session.commit()

    # Respond with the new user's information
    return jsonify({
        'id': new_user.id,
        'name': new_user.name,
        'email': new_user.email,
        'isMentor': new_user.is_mentor
    }), 201

@app.route('/sign_in', methods=['POST'])
def sign_in():
    """API route to sign in a user."""
    data = request.get_json()

    # Validate required fields
    if not data or 'email' not in data:
        return jsonify({'error': 'Email is required.'}), 400

    # Retrieve the email from the request
    email = data.get('email')

    # Check if the user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    # Respond with the user's information (do not return sensitive info like password)
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'isMentor': user.is_mentor
    }), 200


# Event handler for new socket connection


@socketio.on('connect')
def handle_connect():
    """Handle a client connecting to the server."""
    # Emit the current list of waiting users to the newly connected client
    emit('waiting_users', waiting_users)
    print("Client connected")

# Event handler for receiving a message from a client


@socketio.on('message')
def handle_message(msg):
    """Handle a general message event."""
    print(f"Message received: {msg}")
    # Broadcast the message to all connected clients
    socketio.send(msg)

# Event handler for a user joining the waiting list


@socketio.on('join_waiting_list')
def handle_join_waiting_list(user):
    """Handle a user joining the waiting list."""
    if user not in waiting_users:
        waiting_users.append(user)
        print(f"User {user} joined the waiting list.")
        # Notify all clients of the updated waiting list
        print(waiting_users)
        socketio.emit('waiting_users', waiting_users)


# Event handler for a user leaving the waiting list


@socketio.on('leave_waiting_list')
def handle_leave_waiting_list(user_id):
    """Handle a user leaving the waiting list."""
    if user_id in waiting_users:
        waiting_users.remove(user_id)
        print(f"User {user_id} left the waiting list.")
        # Notify all clients of the updated waiting list
        socketio.emit('waiting_users', waiting_users)

# API Route to get the list of waiting users


@app.route('/api/waiting_users', methods=['GET'])
def get_waiting_users():
    """API route to get the current list of waiting users."""
    return jsonify({'waiting_users': waiting_users})

# API Route to retrieve user information by user ID


@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """API route to retrieve a user's information by their ID."""
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found.'}), 404
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'isMentor': user.is_mentor
    })


def setup_database(app):
    with app.app_context():
        db.create_all()


if __name__ == '__main__':
    # Run the Socket.IO server
    setup_database(app)
    socketio.run(app, debug=True)
