// fMentor.jsx
/*
import React from 'react';


const FMentor = () => {
  const existingChats = [
    { id: 1, name: 'John Doe', lastMessage: 'How can I help you today?' },
    { id: 2, name: 'Jane Smith', lastMessage: 'I need assistance with my account.' },
    { id: 3, name: 'Bob Johnson', lastMessage: 'Can you help me with my order?' },
  ];

  const newChats = [
    { id: 4, name: 'Alice Brown', lastMessage: 'I have a question about...' },
    { id: 5, name: 'Mike Davis', lastMessage: 'I need help with...' },
    { id: 6, name: 'Emily Taylor', lastMessage: 'Can you assist me...' },
  ];

  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-1/2 bg-gray-100 p-4 border-r border-gray-200">
        <h2 className="text-2xl mb-4">Inbox</h2>
        {existingChats.map((chat) => (
          <div key={chat.id} className="mb-2 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold">{chat.name}</h3>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
      <div className="w-1/2 bg-gray-50 p-4">
        <h2 className="text-2xl mb-4">New Messages</h2>
        {newChats.map((chat) => (
          <div key={chat.id} className="mb-2 p-4 border border-gray-200 rounded-lg bg-yellow-100">
            <h3 className="text-lg font-semibold">{chat.name}</h3>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FMentor;*/
// FMentor.jsx
import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path based on your folder structure

const FMentor = () => {
  const existingChats = [
    { id: 1, name: 'John Doe', lastMessage: 'How can I help you today?' },
    { id: 2, name: 'Jane Smith', lastMessage: 'I need assistance with my account.' },
    { id: 3, name: 'Bob Johnson', lastMessage: 'Can you help me with my order?' },
  ];

  const newChats = [
    { id: 4, name: 'Alice Brown', lastMessage: 'I have a question about...' },
    { id: 5, name: 'Mike Davis', lastMessage: 'I need help with...' },
    { id: 6, name: 'Emily Taylor', lastMessage: 'Can you assist me...' },
  ];

  return (
    <div>
      <Navbar /> {/* Include Navbar here */}
      <div className="flex flex-row min-h-screen">
        <div className="w-1/2 bg-gray-100 p-4 border-r border-gray-200">
          <h2 className="text-2xl mb-4">Inbox</h2>
          {existingChats.map((chat) => (
            <div key={chat.id} className="mb-2 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold">{chat.name}</h3>
              <p>{chat.lastMessage}</p>
            </div>
          ))}
        </div>
        <div className="w-1/2 bg-gray-50 p-4">
          <h2 className="text-2xl mb-4">New Messages</h2>
          {newChats.map((chat) => (
            <div key={chat.id} className="mb-2 p-4 border border-gray-200 rounded-lg bg-yellow-100">
              <h3 className="text-lg font-semibold">{chat.name}</h3>
              <p>{chat.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FMentor;

