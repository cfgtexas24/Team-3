import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./index.css";

import LandingPage from './pages/index';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;