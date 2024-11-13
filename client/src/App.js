// App.js
import './App.css';
import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import TempPage from './pages/TempPage';
import HumPage from './pages/HumPage';
import AboutPage from './pages/AboutPage';

function App() {
  useEffect(() => {
    // Add the overflow-hidden class to the body on mount
    document.body.classList.add("overflow-hidden");

    // Remove the overflow-hidden class on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="flex-1 flex flex-col bg-blue-50 min-h-screen text-gray-100 font-mono">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/temperature" element={<TempPage />} />
        <Route path="/humidity" element={<HumPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;

