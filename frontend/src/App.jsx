import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./index.css";

import LandingPage from './pages/index';
import ChatPage from "./pages/chat";
import AuthPage from "./pages/auth";
import MentorPage from "./pages/mentor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/mentor" element={<MentorPage />} />
      </Routes>
    </Router>
  );
};

export default App;