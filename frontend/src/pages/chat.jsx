import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { MessageSquare, Send } from 'lucide-react';
import useAppStore from "../useAppStore";
import axios from "axios";

const ENDPOINT = 'http://localhost:5000';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [conversationId, setConversationId] = useState();
  const [pastConversations, setPastConversations] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar visibility
  
  console.log(pastConversations)

  const user = useAppStore(state => state.user);
  const location = useLocation();

  async function getConversationMessages(conversation_id) {
    const response = await axios.post(`http://localhost:5000/get_conversation_messages`, {
      conversation_id: conversation_id
    });

    const newConversationId = response.data.conversation_id;
    const messages = response.data.messages;

    setConversationId(newConversationId);
    setMessages(messages);
  }

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ['websocket'],
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });

    setSocket(socket);

    socket.on('connect', async () => {
      console.log('Connected to Socket.IO server');


      if (user.isMentor === false) {
        const res = await axios.post('http://localhost:5000/create_conversation', {
          user_id: user.id
        });

        const conversationId = res.data.id

        setConversationId(conversationId)

        socket.emit('join_waiting_list', { user, conversationId: conversationId });
      } else {
        const { conversationId } = location.state
        setConversationId(conversationId);

        await axios.post('http://localhost:5000/append_conversation', {
          user_id: user.id,
          conversation_id: conversationId,
        });
      }

      const prevConversationsResponse = await axios.post(`http://localhost:5000/get_user_conversations`, {
        user_id: user.id
      });

      const prevConversations = prevConversationsResponse.data.conversations

      setPastConversations(prevConversations);

      console.log(prevConversations);
    });


    socket.on('message', (msg) => {
      const { text, user } = msg;
      setMessages((prevMessages) => [...prevMessages, { text, user }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  console.log(messages)

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message) {
      try {
        // Make API request to append the message
        await axios.post('http://localhost:5000/append_message', {
          message: message,
          user: user, // Assuming `user` is already defined and contains user details
          conversationId: conversationId // The ID of the conversation
        }).catch(err => console.log(err));

        // Emit the message to the socket
        socket.emit("message", { text: message, user: user, conversationId: conversationId });

        // Clear the message input
        setMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
        // You might want to handle the error (e.g., show a notification to the user)
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <header className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">STORM</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#rag" className="hover:text-gray-300">RAG Page</a></li>
              <li><a href="#p2p" className="hover:text-gray-300">P2P Page</a></li>
              <li><a href="#board" className="hover:text-gray-300">Message Board</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`bg-white shadow-md border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"} overflow-hidden`}>
          {isSidebarOpen && (
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4">Recent Chats</h2>
              <ul className="space-y-4">
                {pastConversations.map((chat, index) => (
                  chat.id !== conversationId && (
                    <li key={index} className="bg-blue-100 p-3 rounded-lg shadow-md hover:bg-blue-200" onClick={() => getConversationMessages(chat.id)}>
                      <div className="flex items-center space-x-2">
                        <MessageSquare size={20} className="text-blue-500" />
                        <p className="truncate">{chat.messages[0]?.text}</p>
                      </div>
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col pl-4">
          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                  <MessageSquare size={24} className="text-white" />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-lg">
                  <p>Welcome! How can we assist you today?</p>
                </div>
              </div>
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start space-x-2 ${msg.user.id === user.id ? "flex-row-reverse" : ""}`}>
                  <div className={`rounded-full p-2 ${msg.user.id === user.id ? "bg-green-500" : "bg-blue-500"}`}>
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <div className={`rounded-lg p-3 shadow-md ${msg.user.id === user.id ? "bg-green-100" : "bg-white"}`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="bg-white p-4 border-t border-gray-200">
            <div className="flex items-center bg-gray-100 rounded-full pr-2">
              <input type="text" className="flex-1 p-3 bg-transparent" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
              <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-2">
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;