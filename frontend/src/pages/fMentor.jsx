// FMentor.jsx
//import React from 'react';
import Navbar from '../components/navbar'; // Adjust the path based on your folder structure
import { FiAlertCircle } from 'react-icons/fi'; // Import the alert icon

const FMentor = () => {
  const existingChats = [
    { id: 1, name: 'John Doe', lastMessage: 'How can I help you today?' },
    { id: 2, name: 'Jane Smith', lastMessage: 'I need assistance with my account.' },
    { id: 3, name: 'Bob Johnson', lastMessage: 'Can you help me with my order?' },
    { id: 4, name: 'Sarah Lee', lastMessage: 'I have a question about...' },
    { id: 5, name: 'Michael Brown', lastMessage: 'I need help with...' },
    { id: 6, name: 'Emily Taylor', lastMessage: 'Can you assist me...' },
    { id: 7, name: 'Kevin White', lastMessage: 'I need information about...' },
  ];

  const newChats = [
    { id: 8, name: 'Alice Brown', lastMessage: 'I have a question about...' },
    { id: 9, name: 'Mike Davis', lastMessage: 'I need help with...' },
    { id: 10, name: 'Emily Taylor', lastMessage: 'Can you assist me...' },
  ];

  return (
    <div>
      <Navbar /> {/* Include Navbar here */}
      <div className="flex flex-row min-h-screen">
        <div className="w-1/2 bg-gray-100 p-4 border-r border-gray-300"> {/* Darker outline for existing chats */}
          <h2 className="text-2xl mb-4">Inbox</h2>
          {existingChats.map((chat) => (
            <div key={chat.id} className="mb-2 p-4 border border-gray-300 rounded-lg"> {/* Darker outline for existing chats */}
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{chat.name}</h3>
              </div>
              <p>{chat.lastMessage}</p>
            </div>
          ))}
        </div>
        <div className="w-1/2 bg-gray-50 p-4">
          <h2 className="text-2xl mb-4">New Messages</h2>
          {newChats.map((chat) => (
            <div key={chat.id} className="mb-2 p-4 border border-gray-200 rounded-lg bg-yellow-100">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{chat.name}</h3>
                <FiAlertCircle className="ml-2 text-red-500" /> {/* Add the alert icon next to the name */}
              </div>
              <p>{chat.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FMentor;
