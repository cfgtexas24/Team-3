import { useEffect, useState } from "react";
import io from 'socket.io-client';

import StormAvatar from "../components/StormAvatar";
import ChatBubble from "../components/ChatBubble";

const ENDPOINT = 'http://localhost:5000';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();

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

    // Update to handle admin and user messages separately
    socket.on('message', (msg) => {
      console.log('Message from server:', msg);
      setMessages((prevMessages) => [...prevMessages, { text: msg, sender: 'server' }]); 
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);  // Store the user message
      socket.emit("message", message);  // Send user message to the server
      setMessage('');  // Clear the input after sending
    }
  }

  console.log(messages);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">STORM</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#home" className="hover:text-gray-300">RAG Page</a></li>
              <li><a href="#features" className="hover:text-gray-300">P2p Page</a></li>
              <li><a href="#contact" className="hover:text-gray-300">Message Board</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center space-x-2 mb-4">
              <StormAvatar />
              <ChatBubble isResponse={true}>
                <p>Howdy! The STORM Center of Hope and Services supports individuals and families through counseling, education, and community services. How can we help you!</p>
              </ChatBubble>
            </div>

            {/* Display dynamic messages */}
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-center gap-x-2 mb-4 ${msg.sender === "user" ? "flex-row-reverse text-right" : ""}`}>
                <StormAvatar />
                <ChatBubble isResponse={true}>
                  <p>{msg.text}</p>
                </ChatBubble>
              </div>
            ))}
          </div>

          <form className="p-4 border-t" onSubmit={sendMessage}>
            <div className="flex items-center bg-white rounded-lg border">
              <input
                type="text"
                className="flex-1 p-3 bg-transparent focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button type="submit" className="p-3">
                <svg width="24" height="24" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.655396 34L31.263 17L0.655396 0L4.89595 13.1308L21.2664 17L4.89595 21.2815L0.655396 34Z" fill="#CCCCCC" />
                </svg>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default App;
