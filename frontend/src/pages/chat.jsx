import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import io from 'socket.io-client';
import { MessageSquare, Send } from 'lucide-react';
import useAppStore from "../useAppStore";

const ENDPOINT = 'http://localhost:5000';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();

  const user = useAppStore(state => state.user);

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

    console.log(user);

    if(user.isMentor == false) {
      socket.emit('join_waiting_list', user);
    }

    socket.on('message', (msg) => {
      const { text, user } = msg;
      setMessages((prevMessages) => [...prevMessages, { text, user: user }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log(messages)

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", { text: message, user: user });
      setMessage('');
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">STORM</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" className="hover:text-blue-200 transition duration-150">RAG Page</a></li>
              <li><a href="#features" className="hover:text-blue-200 transition duration-150">P2p Page</a></li>
              <li><a href="#contact" className="hover:text-blue-200 transition duration-150">Message Board</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            { user.isMentor == false && (<div className="flex items-start space-x-2 mb-4">
              <div className="bg-blue-500 rounded-full p-2">
                <MessageSquare size={24} className="text-white" />
              </div>
              <div className="bg-white rounded-lg p-3 shadow-md max-w-xs lg:max-w-md">
                <p>Howdy! The STORM Center of Hope and Services supports individuals and families through counseling, education, and community services. How can we help you!</p>
              </div>
            </div>) }

            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start space-x-2 ${msg.user.id === user.id ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className={`rounded-full p-2 ${msg.user.id === user.id ? "bg-green-500" : "bg-blue-500"}`}>
                  <MessageSquare size={24} className="text-white" />
                </div>
                <div className={`rounded-lg p-3 shadow-md max-w-xs lg:max-w-md ${msg.user.id === user.id ? "bg-green-100" : "bg-white"}`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        <form onSubmit={sendMessage} className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-3xl mx-auto flex items-center bg-gray-100 rounded-full overflow-hidden pr-2">
            <input
              type="text"
              className="flex-1 p-3 bg-transparent focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button type="submit" className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-150">
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;