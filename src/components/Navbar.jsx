import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLinkClick = () => {
        setIsMenuOpen(false); // Close the menu when a link is clicked
    };

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-white text-xl font-bold flex items-center"
                            onClick={handleLinkClick}
                        >
                            {/* <img
                                src="/logo.png" // Replace with the path to your logo
                                alt="Logo"
                                className="h-8 w-8 mr-2"
                            /> */}
                            Lost & Found
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-blue-400" onClick={handleLinkClick}>
                            Home
                        </Link>
                        <Link to="/about" className="hover:text-blue-400" onClick={handleLinkClick}>
                            About
                        </Link>
                        <Link to="/contact" className="hover:text-blue-400" onClick={handleLinkClick}>
                            Contact Us
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/lost" className="hover:text-blue-400" onClick={handleLinkClick}>
                                    Lost Items
                                </Link>
                                <Link to="/found" className="hover:text-blue-400" onClick={handleLinkClick}>
                                    Found Items
                                </Link>
                                <Link to="/report-lost" className="hover:text-blue-400" onClick={handleLinkClick}>
                                    Report Lost
                                </Link>
                                <Link to="/report-found" className="hover:text-blue-400" onClick={handleLinkClick}>
                                    Report Found
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        toast.success("Loged Out Successfully")
                                        navigate("/login");
                                        handleLinkClick();
                                    }}
                                    className="hover:text-red-400 focus:outline-none"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-blue-400" onClick={handleLinkClick}>
                                    Login
                                </Link>
                                <Link to="/signup" className="hover:text-blue-400" onClick={handleLinkClick}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-blue-400 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900 text-white">
                    <div className="px-4 py-2 space-y-2">
                        <Link to="/" className="block hover:text-blue-400" onClick={handleLinkClick}>
                            Home
                        </Link>
                        <Link to="/about" className="block hover:text-blue-400" onClick={handleLinkClick}>
                            About
                        </Link>
                        <Link to="/contact" className="block hover:text-blue-400" onClick={handleLinkClick}>
                            Contact Us
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/lost" className="block hover:text-blue-400" onClick={handleLinkClick}>
                                    Lost Items
                                </Link>
                                <Link to="/found" className="block hover:text-blue-400" onClick={handleLinkClick}>
                                    Found Items
                                </Link>
                                <Link to="/report-lost" className="block hover:text-blue-400" onClick={handleLinkClick}>
                                    Report Lost
                                </Link>
                                <Link to="/report-found" className="block hover:text-blue-400" onClick={handleLinkClick}>
                                    Report Found
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate("/login");
                                        handleLinkClick();
                                    }}
                                    className="block text-left hover:text-red-400 w-full focus:outline-none"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block hover:text-blue-400" onClick={handleLinkClick}>
                                    Login
                                </Link>
                                <Link to="/signup" className="block hover:text-blue-400" onClick={handleLinkClick}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
