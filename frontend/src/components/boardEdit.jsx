/* eslint-disable react/prop-types */
import { useState } from 'react';

function Note({ note, onRemove }) {
  return (
    <div className="bg-pink-200 p-4 rounded shadow-md relative">
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-gray-800 rounded-full"></div>
      <img src={note.img_src} alt="Note" className="w-full h-auto mb-2" />
      <div className="text-center">
      <a href={note.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
        {note.message}
      </a>
      </div>
      <button 
        onClick={() => onRemove(note.id)}
        className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
}

function BoardEdit({ notes, addNote, removeNote }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNote, setNewNote] = useState({ id: 0, message: '', img_src: '', link: '' });
  
    const handleAddNote = () => {
      // Generate a unique ID (this is a simple way, consider using a more robust method in production)
      const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
      addNote({ ...newNote, id: newId });
      setNewNote({ id: 0, message: '', img_src: '', link: '' });
      setIsModalOpen(false);
    };

  return (
    <div>
      <div className="bg-amber-800 p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Note key={note.id} note={note} onRemove={removeNote} />
          ))}
        </div>
      </div>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Note
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Add New Note</h3>
            <input
              type="text"
              placeholder="Message"
              value={newNote.message}
              onChange={(e) => setNewNote({...newNote, message: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newNote.img_src}
              onChange={(e) => setNewNote({...newNote, img_src: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Link"
              value={newNote.link}
              onChange={(e) => setNewNote({...newNote, link: e.target.value})}
              className="w-full p-2 mb-2 border rounded"
            />
            <button onClick={handleAddNote} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
            <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardEdit;