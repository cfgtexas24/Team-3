// src/App.jsx
import React from 'react';
import LandingPage from './pages/Landingpage'; // Ensure this path is correct

import "./index.css";

const App = () => {
    return (
        <div>
            <LandingPage /> {/* Use the NotesBox component */}
        </div>
    );
};

export default App;
