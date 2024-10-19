/*import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./index.css";

import LandingPage from './pages/index';
//import ChatPage from "./pages/chat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;*/
/*
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";

import LandingPage from './pages/index';
import FlipNavWrapper from './components/navbar'; // Adjust the path if necessary

const App = () => {
  return (
    <Router>
      <FlipNavWrapper />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add other routes here if needed }
      </Routes>
    </Router>
  );
};

export default App;*/
/*
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";

import LandingPage from './pages/index';
import FlipNavWrapper from './components/navbar'; // Adjust the path if necessary
import { SwipeCarousel } from './components/swipe'; // Adjust the path if necessary
//import ScrollingTestimonials from './components/scrolling'; // Adjust the path if necessary

const App = () => {
  return (
    <Router>
      <FlipNavWrapper />
      <SwipeCarousel />
      <ScrollingTestimonials /> {/* Include the ScrollingTestimonials component }
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add other routes here if needed }
      </Routes>
    </Router>
  );
};

export default App;*/
/*This one works UNDER
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";

import LandingPage from './pages/index';
import FlipNavWrapper from './components/navbar'; // Adjust the path if necessary
import { SwipeCarousel } from './components/swipe'; // Adjust the path if necessary

const App = () => {
  return (
    <Router>
      <FlipNavWrapper />
      <SwipeCarousel /> {/* Include the SwipeCarousel component here }
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add other routes here if needed }
      </Routes>
    </Router>
  );
};

export default App;*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";

import LandingPage from './pages/index';
import FlipNavWrapper from './components/navbar'; // Adjust the path if necessary
import { SwipeCarousel } from './components/swipe'; // Adjust the path if necessary
import ScrollingTestimonials from './components/ScrollingTestimonials'; // Adjust the path if necessary

const App = () => {
  return (
    <Router>
      <FlipNavWrapper />
      <SwipeCarousel />
      <ScrollingTestimonials /> {/* Include the ScrollingTestimonials component */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add other routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;


