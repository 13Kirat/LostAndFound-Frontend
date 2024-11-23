import React, { useEffect, useState } from 'react';
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
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  // State to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if a token exists in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // Set to true if the token is found
    }
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
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
  );
};

export default App;
