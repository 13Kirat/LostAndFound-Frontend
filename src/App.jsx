import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LostItems from './pages/LostItems';
import FoundItems from './pages/FoundItems';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isLoggedIn } = useAuth(); // Get login status from AuthContext
  return (
    <>
      <div className="bg-gray-900">

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Secure routes for authenticated users */}
            {isLoggedIn && (
              <>
                <Route path="/lost" element={<LostItems />} />
                <Route path="/found" element={<FoundItems />} />
                <Route path="/report-lost" element={<ReportLost />} />
                <Route path="/report-found" element={<ReportFound />} />
              </>
            )}
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
