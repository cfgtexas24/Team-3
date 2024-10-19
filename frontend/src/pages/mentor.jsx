import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { UserCheck, Clock } from "lucide-react";

const ENDPOINT = "http://localhost:5000";

function Mentor() {
  const [waitingUsers, setWaitingUsers] = useState([]);
  const [socket, setSocket] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("waiting_users", (users) => {
      console.log(users);
      setWaitingUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinChat = (data) => {
    console.log(data);

    console.log(`Joining chat with user: ${data.user.id}`);
    socket.emit("leave_waiting_list", data.user.id);
    navigate("/chat", { state: { type: "mentor", conversationId: data.conversationId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-gray-800 text-white p-6">
          <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        </header>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Waiting Users
          </h2>
          <div className="space-y-4">
            {waitingUsers.map((user) => (
              <div
                key={user.id}
                className="bg-gray-50 rounded-lg p-4 flex items-center justify-between shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <UserCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      User: {user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Waiting since: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => joinChat(user)}
                >
                  Join Chat
                </button>
              </div>
            ))}
            {waitingUsers.length === 0 && (
              <div className="text-center py-10">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">
                  No users waiting at the moment
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mentor;
