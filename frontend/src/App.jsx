import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./index.css";

import LandingPage from './pages/index';
import ChatPage from "./pages/chat";
import AuthPage from "./pages/auth";
import MentorPage from "./pages/mentor";
import BulletinBoard from './pages/bulletinBoard';
import Board from "./components/boardEdit";
import BoardEdit from './components/boardEdit';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/bulletin');
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
      const response = await fetch('http://localhost:5000/bulletin', {
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
      const response = await fetch(`http://localhost:5000/bulletin/${id}`, {
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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/board" element={<BulletinBoard />} />
        <Route path="/board" element={<Board notes={notes} />} />
        <Route path="/edit" element={<BoardEdit notes={notes} addNote={addNote} removeNote={removeNote} />} />
      </Routes>
    </Router>
  );
};

export default App;