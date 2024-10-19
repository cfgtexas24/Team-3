import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css"; // Your global styles

import LandingPage from './pages/Landingpage';

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
