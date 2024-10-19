import { useEffect } from "react";
import io from 'socket.io-client';

import OllieAvatar from "../components/OllieAvatar";
import ChatBubble from "../components/ChatBubble";

const ENDPOINT = 'http://localhost:5000';

function App() {
  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ['websocket'],
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('message', (msg) => {
      console.log('Message from server:', msg);
    });

    socket.emit("message", "hello");

    return () => {
      socket.disconnect();
    };
  }, []);

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
              <OllieAvatar />
              <ChatBubble isResponse={true}>
                <p>Howdy! The STORM Center of Hope and Services supports individuals and families through counseling, education and community services. How can we help you!</p>
              </ChatBubble>
            </div>
          </div>

          <form className="p-4 border-t">
            <div className="flex items-center bg-white rounded-lg border">
              <input
                type="text"
                className="flex-1 p-3 bg-transparent focus:outline-none"
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