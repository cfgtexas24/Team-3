from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from sqlalchemy.ext.mutable import MutableList
import os

app = Flask(__name__)

# CORS and SocketIO setup
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL', 'postgresql://postgres.wvckutfciwyfmdkjjagv:0a3LSKB2A7NaMO9P@aws-0-us-east-1.pooler.supabase.com:6543/postgres')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    is_mentor = Column(Boolean, default=False)
    conversations = Column(MutableList.as_mutable(ARRAY(String)), default=list)

class Conversation(db.Model):
    id = Column(Integer, primary_key=True)
    messages = Column(MutableList.as_mutable(JSONB), default=list)

class Mentor(db.Model):
    id = Column(Integer, primary_key=True)
    # Add other fields as needed

class Mentee(db.Model):
    id = Column(Integer, primary_key=True)
    # Add other fields as needed

class Chat(db.Model):
    id = Column(Integer, primary_key=True)
    # Add other fields as needed

class Admin(db.Model):
    id = Column(Integer, primary_key=True)
    # Add other fields as needed

class Emergency(db.Model):
    id = Column(Integer, primary_key=True)
    # Add other fields as needed

class Notification(db.Model):
    id = Column(Integer, primary_key=True)
    # Add other fields as needed

class Bulletin(db.Model):
    id = Column(Integer, primary_key=True)
    # Add other fields as needed

# Routes
@app.route('/')
def index():
    return "Socket.IO Server Running!"

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({'error': 'Name and email are required.'}), 400
    
    name = data.get('name')
    email = data.get('email')
    role = data.get('role')
    is_mentor = role == 'Mentor'

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email is already in use.'}), 400

    new_user = User(name=name, email=email, is_mentor=is_mentor)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'id': new_user.id,
        'name': new_user.name,
        'email': new_user.email,
        'isMentor': new_user.is_mentor
    }), 201

@app.route('/sign_in', methods=['POST'])
def sign_in():
    data = request.get_json()
    if not data or 'email' not in data:
        return jsonify({'error': 'Email is required.'}), 400

    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'isMentor': user.is_mentor
    }), 200

@app.route('/create_conversation', methods=['POST'])
def create_conversation():
    data = request.get_json()
    user_id = data.get("user_id")

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    new_conversation = Conversation(messages=[])
    db.session.add(new_conversation)
    db.session.commit()

    user.conversations.append(str(new_conversation.id))
    db.session.commit()

    return jsonify({'id': new_conversation.id}), 201

@app.route('/append_conversation', methods=['POST'])
def append_conversation():
    data = request.get_json()

    if not data or 'user_id' not in data or 'conversation_id' not in data:
        return jsonify({'error': 'User ID and conversation ID are required.'}), 400

    user_id = data['user_id']
    conversation_id = data['conversation_id']

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    user.conversations.append(str(conversation_id))

    print(user.conversations)
    
    db.session.commit()

    return jsonify({
        'user_id': user.id,
        'conversations': user.conversations,
    }), 200

@app.route('/get_user_conversations', methods=['POST'])
def get_user_conversations():
    data = request.get_json()
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required.'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found.'}), 404

    conversations = Conversation.query.filter(Conversation.id.in_(user.conversations)).all()

    conversation_details = [
        {'id': conv.id, 'messages': conv.messages}
        for conv in conversations
    ]

    return jsonify({
        'user_id': user.id,
        'conversations': conversation_details
    }), 200

@app.route('/get_conversation_messages', methods=['POST'])
def get_conversation_messages():
    data = request.get_json()
    conversation_id = data.get('conversation_id')

    if not conversation_id:
        return jsonify({'error': 'Conversation ID is required.'}), 400

    conversation = Conversation.query.get(conversation_id)
    if not conversation:
        return jsonify({'error': 'Conversation not found.'}), 404

    return jsonify({
        'conversation_id': conversation.id,
        'messages': conversation.messages
    }), 200

@app.route('/append_message', methods=['POST'])
def append_message():
    data = request.get_json()

    if not data or 'message' not in data or 'user' not in data or 'conversationId' not in data:
        return jsonify({'error': 'Message, user, and conversationId are required.'}), 400

    message = data['message']
    user = data['user']
    conversation_id = data['conversationId']

    conversation = Conversation.query.get(conversation_id)
    if not conversation:
        return jsonify({'error': 'Conversation not found.'}), 404

    new_message = {
        'text': message,
        'user': user,
        'conversationId': conversation_id
    }

    conversation.messages.append(new_message)
    db.session.add(conversation)
    db.session.commit()

    return jsonify({
        'id': conversation.id,
        'messages': conversation.messages,
    }), 200

@app.route('/mentors', methods=['POST'])
def create_mentor():
    mentor_data = request.get_json()
    new_mentor = Mentor(**mentor_data)
    db.session.add(new_mentor)
    db.session.commit()
    return jsonify({"id": new_mentor.id}), 201

@app.route('/mentors', methods=['GET'])
def get_mentors():
    mentors = Mentor.query.all()
    return jsonify([mentor.to_dict() for mentor in mentors])

@app.route('/mentors/<int:mentor_id>', methods=['GET'])
def get_mentor_by_id(mentor_id):
    mentor = Mentor.query.get_or_404(mentor_id)
    return jsonify(mentor.to_dict())

@app.route('/mentees', methods=['POST'])
def create_mentee():
    mentee_data = request.get_json()
    new_mentee = Mentee(**mentee_data)
    db.session.add(new_mentee)
    db.session.commit()
    return jsonify({"id": new_mentee.id}), 201

@app.route('/mentees', methods=['GET'])
def get_mentees():
    mentees = Mentee.query.all()
    return jsonify([mentee.to_dict() for mentee in mentees])

@app.route('/mentees/<int:mentee_id>', methods=['GET'])
def get_mentee_by_id(mentee_id):
    mentee = Mentee.query.get_or_404(mentee_id)
    return jsonify(mentee.to_dict())

@app.route('/admin', methods=['POST'])
def create_admin():
    admin_data = request.get_json()
    new_admin = Admin(**admin_data)
    db.session.add(new_admin)
    db.session.commit()
    return jsonify({"id": new_admin.id}), 201

@app.route('/admin', methods=['GET'])
def get_admins():
    admins = Admin.query.all()
    return jsonify([admin.to_dict() for admin in admins])

@app.route('/admin/<int:admin_id>', methods=['GET'])
def get_admin_by_id(admin_id):
    admin = Admin.query.get_or_404(admin_id)
    return jsonify(admin.to_dict())

@app.route('/chat', methods=['GET'])
def get_chats():
    chats = Chat.query.all()
    return jsonify([chat.to_dict() for chat in chats])

@app.route('/chat/<int:chat_id>', methods=['GET'])
def get_chat_by_id(chat_id):
    chat = Chat.query.get_or_404(chat_id)
    return jsonify(chat.to_dict())

@app.route('/email', methods=['GET'])
def get_email():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    return jsonify(user.to_dict() if user else {"error": "Email not found"})

@app.route('/email/<string:email>', methods=['GET'])
def get_email_by_id(email):
    user = User.query.filter_by(email=email).first_or_404()
    return jsonify(user.to_dict())

@app.route('/email', methods=['POST'])
def create_email():
    email_data = request.get_json()
    new_user = User(email=email_data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"id": new_user.id}), 201

@app.route('/emergency', methods=['POST'])
def create_emergency():
    emergency_data = request.get_json()
    new_emergency = Emergency(**emergency_data)
    db.session.add(new_emergency)
    db.session.commit()
    return jsonify({"id": new_emergency.id}), 201

@app.route('/emergency', methods=['GET'])
def get_emergencies():
    emergencies = Emergency.query.all()
    return jsonify([emergency.to_dict() for emergency in emergencies])

@app.route('/emergency/<int:emergency_id>', methods=['GET'])
def get_emergency_by_id(emergency_id):
    emergency = Emergency.query.get_or_404(emergency_id)
    return jsonify(emergency.to_dict())

@app.route('/chat', methods=['POST'])
def create_chat():
    chat_data = request.get_json()
    new_chat = Chat(**chat_data)
    db.session.add(new_chat)
    db.session.commit()
    return jsonify({"id": new_chat.id}), 201

@app.route('/notifications', methods=['POST'])
def create_notification():
    notification_data = request.get_json()
    new_notification = Notification(**notification_data)
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({"id": new_notification.id}), 201

@app.route('/notifications', methods=['GET'])
def get_notifications():
    notifications = Notification.query.all()
    return jsonify([notification.to_dict() for notification in notifications])

@app.route('/notifications/<int:notification_id>', methods=['GET'])
def get_notification_by_id(notification_id):
    notification = Notification.query.get_or_404(notification_id)
    return jsonify(notification.to_dict())

@app.route('/mentors/byusername/<string:username>', methods=['GET'])
def get_mentors_by_username(username):
    mentor = Mentor.query.filter_by(username=username).first_or_404()
    return jsonify(mentor.to_dict())

@app.route('/mentees/byusername/<string:username>', methods=['GET'])
def get_mentees_by_username(username):
    mentee = Mentee.query.filter_by(username=username).first_or_404()
    return jsonify(mentee.to_dict())

@app.route('/admins/byusername/<string:username>', methods=['GET'])
def get_admins_by_username(username):
    admin = Admin.query.filter_by(username=username).first_or_404()
    return jsonify(admin.to_dict())

@app.route('/bulletin', methods=['GET'])
def get_bulletin():
    bulletins = Bulletin.query.all()
    return jsonify([bulletin.to_dict() for bulletin in bulletins])

@app.route('/bulletin', methods=['POST'])
def create_bulletin():
    bulletin_data = request.get_json()
    new_bulletin = Bulletin(**bulletin_data)
    db.session.add(new_bulletin)
    db.session.commit()
    return jsonify({"id": new_bulletin.id}), 201

@app.route('/bulletin/<int:bulletin_id>', methods=['DELETE'])
def delete_bulletin(bulletin_id):
    bulletin = Bulletin.query.get_or_404(bulletin_id)
    db.session.delete(bulletin)
    db.session.commit()
    return '', 204

waiting_users = []

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
    # Broadcast the message to all connected clients
    socketio.send(msg)

# Event handler for a user joining the waiting list


@socketio.on('join_waiting_list')
def handle_join_waiting_list(data):
    print(data)
    """Handle a user joining the waiting list."""
    if data not in waiting_users:
        waiting_users.append(data)
        print(f"User {data} joined the waiting list.")
        # Notify all clients of the updated waiting list
        print(waiting_users)
        socketio.emit('waiting_users', waiting_users)


# Event handler for a user leaving the waiting list


@socketio.on('leave_waiting_list')
def handle_leave_waiting_list(data):
    """Handle a user leaving the waiting list."""
    if data in waiting_users:
        waiting_users.remove(data)
        print(f"User {data} left the waiting list.")
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