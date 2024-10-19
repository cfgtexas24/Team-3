import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import io from "socket.io-client";
import { MessageSquare, Send } from "lucide-react";

const ENDPOINT = "http://localhost:5000";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [user, setUser] = useState(uuid());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar visibility

  const location = useLocation();
  const userType = location.state;

  const recentChats = [
    { text: "Hello! How can we assist you today?" },
    { text: "I have an issue with my account." },
    { text: "Sure! I'll help you with that." },
    { text: "Thank you for reaching out." },
    { text: "Is there anything else I can assist you with?" },
  ];

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    setSocket(socket);
    setUser(uuid());

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    if (userType === "mentee") {
      socket.emit("join_waiting_list", uuid());
    }

    socket.on("message", (msg) => {
      const { text, userId } = msg;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text, userId: userId },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userType]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", { text: message, userId: user });
      setMessage("");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">STORM</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#home"
                  className="hover:text-blue-200 transition duration-150"
                >
                  RAG Page
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-blue-200 transition duration-150"
                >
                  P2p Page
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-200 transition duration-150"
                >
                  Message Board
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Toggle Button */}
        <div
          className={`flex items-center justify-center w-10 bg-gray-300 cursor-pointer transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "rounded-l-md" : "rounded-md"
          }`}
          onClick={toggleSidebar}
          style={{
            backgroundColor: isSidebarOpen ? "#d1d5db" : "#e5e7eb", // Darker when open
          }}
        >
          {isSidebarOpen ? "❌" : "☰"} {/* Icons to indicate open/close */}
        </div>

        {/* Left Sidebar for Recent Chats */}
        <aside
          className={`bg-white shadow-md border-r border-gray-200 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          {isSidebarOpen && (
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4">Recent Chats</h2>
              <ul className="space-y-4">
                {recentChats.map((chat, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 p-3 rounded-lg shadow hover:bg-blue-200 transition duration-150"
                  >
                    <div className="flex items-center space-x-2">
                      <MessageSquare size={20} className="text-blue-500" />
                      <p className="truncate max-w-full">{chat.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col ${isSidebarOpen ? "pl-4" : ""}`}>
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Initial message */}
              <div className="flex items-start space-x-2 mb-4">
                <div className="bg-blue-500 rounded-full p-2">
                  <MessageSquare size={24} className="text-white" />
                </div>
                <div className="bg-white rounded-lg p-3 shadow-md max-w-xs lg:max-w-md">
                  <p>
                    Howdy! The STORM Center of Hope and Services supports
                    individuals and families through counseling, education, and
                    community services. How can we help you!
                  </p>
                </div>
              </div>

              {/* Chat messages */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 ${
                    msg.userId === user
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`rounded-full p-2 ${
                      msg.userId === user ? "bg-green-500" : "bg-blue-500"
                    }`}
                  >
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <div
                    className={`rounded-lg p-3 shadow-md max-w-xs lg:max-w-md ${
                      msg.userId === user ? "bg-green-100" : "bg-white"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Message input */}
          <form
            onSubmit={sendMessage}
            className="bg-white border-t border-gray-200 p-4"
          >
            <div className="max-w-3xl mx-auto flex items-center bg-gray-100 rounded-full overflow-hidden pr-2">
              <input
                type="text"
                className="flex-1 p-3 bg-transparent focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-150"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
