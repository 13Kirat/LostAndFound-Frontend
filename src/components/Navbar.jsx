import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For toggling the mobile menu
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (token && storedUser) {
            setIsLoggedIn(true); // Set logged-in status to true if token exists
            setUser(storedUser); // Set user data from localStorage
        } else {
            setIsLoggedIn(false); // If no token, set logged-in status to false
            setUser(null); // Reset user data
        }
    }, []); // Empty dependency array ensures this only runs once on component mount

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo and Desktop Links */}
                <div className="flex items-center">
                    <img src="https://www.clipartmax.com/png/middle/91-911540_lost-and-found-lost-and-found-signs.png" alt="" className='w-52' />
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>

                {/* Links (Desktop View) */}
                <div className="hidden lg:flex space-x-6">
                    <Link to="/" className="text-white text-lg font-semibold">Home</Link>
                    <Link to="/about" className="text-white text-lg font-semibold">About</Link>
                    <Link to="/contact" className="text-white text-lg font-semibold">Contact Us</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/lost" className="text-white text-lg font-semibold">Lost Items</Link>
                            <Link to="/found" className="text-white text-lg font-semibold">Found Items</Link>
                            <Link to="/report-lost" className="text-white text-lg font-semibold">Report Lost</Link>
                            <Link to="/report-found" className="text-white text-lg font-semibold">Report Found</Link>
                            <button
                                onClick={handleLogout}
                                className="text-white text-lg font-semibold"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white text-lg font-semibold">Login</Link>
                            <Link to="/signup" className="text-white text-lg font-semibold">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden mt-4 space-y-4">
                    <Link to="/" className="block text-white text-lg font-semibold">Home</Link>
                    <Link to="/about" className="block text-white text-lg font-semibold">About</Link>
                    <Link to="/contact" className="block text-white text-lg font-semibold">Contact Us</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/lost" className="block text-white text-lg font-semibold">Lost Items</Link>
                            <Link to="/found" className="block text-white text-lg font-semibold">Found Items</Link>
                            <Link to="/report-lost" className="block text-white text-lg font-semibold">Report Lost</Link>
                            <Link to="/report-found" className="block text-white text-lg font-semibold">Report Found</Link>
                            <button
                                onClick={handleLogout}
                                className="block text-white text-lg font-semibold"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block text-white text-lg font-semibold">Login</Link>
                            <Link to="/signup" className="block text-white text-lg font-semibold">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
