import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

function Mentor() {
  const [waitingUsers, setWaitingUsers] = useState([]);
  const [socket, setSocket] = useState();
  const userId = uuid(); // Unique ID for the mentor

  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ['websocket'],
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });

    setSocket(socket);

    socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
    });

    socket.on('waiting_users', (users) => {
      console.log(users)
        setWaitingUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinChat = (waitingUserId) => {
    // Logic to join the chat with the selected user
    console.log(`Joining chat with user: ${waitingUserId}`);
    socket.emit('leave_waiting_list', waitingUserId);
    navigate("/chat", { state: "mentor" });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mentor Dashboard</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden p-4">
        <h2 className="text-xl font-bold mb-4">Waiting Users</h2>
        <ul className="space-y-2">
          {waitingUsers.map((user) => (
            <li key={user} className="flex items-center justify-between p-2 border-b">
              <span>User ID: {user}</span>
              <button 
                className="bg-blue-500 text-white p-2 rounded" 
                onClick={() => joinChat(user)}
              >
                Join Chat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Mentor;