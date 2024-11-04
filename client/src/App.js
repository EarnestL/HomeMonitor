// App.js
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import TempPage from './pages/TempPage';

function App() {
  return (
    <div className="flex-1 flex flex-col bg-blue-50 min-h-screen text-gray-100 font-mono">
      <Navbar />
      <div className="pt-16"> {/* Adds padding to account for the fixed navbar height */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/temperature" element={<TempPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

