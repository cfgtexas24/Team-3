import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Board from './Board';
import BoardEdit from './BoardEdit';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:8000/bulletin');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const response = await fetch('http://localhost:8000/bulletin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote)
      });
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      const addedNote = await response.json();
      setNotes(prevNotes => [...prevNotes, addedNote]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const removeNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/bulletin/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete note');
      }
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  

  return (
    <Router>
      <div className="bg-yellow-50 p-8 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Community Bulletin Board</h1>
          <nav className="mb-4">
            <Link to="/board" className="mr-4 text-blue-500 hover:text-blue-700">View Board</Link>
            <Link to="/edit" className="text-blue-500 hover:text-blue-700">Edit Board</Link>
          </nav>
          <Routes>
            <Route path="/board" element={<Board notes={notes} />} />
            <Route path="/edit" element={<BoardEdit notes={notes} addNote={addNote} removeNote={removeNote} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
