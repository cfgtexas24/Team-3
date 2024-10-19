import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import LandingPage from "./pages/index";
import ChatPage from "./pages/chat";
import LoginSignIn from "./pages/LoginSignUp";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/LoginSignup" element={<LoginSignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
