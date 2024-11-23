import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <nav className="bg-blue-600 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div>
                    <Link to="/" className="text-white text-lg font-semibold mr-6">Home</Link>
                    <Link to="/about" className="text-white text-lg font-semibold mr-6">About</Link>
                    <Link to="/contact" className="text-white text-lg font-semibold">Contact Us</Link>
                </div>
                <div>
                    {isLoggedIn ? (
                        <>
                            <Link to="/lost" className="text-white text-lg font-semibold mr-6">Lost Items</Link>
                            <Link to="/found" className="text-white text-lg font-semibold mr-6">Found Items</Link>
                            <Link to="/report-lost" className="text-white text-lg font-semibold mr-6">Report Lost</Link>
                            <Link to="/report-found" className="text-white text-lg font-semibold mr-6">Report Found</Link>
                            <button
                                onClick={logout}
                                className="text-white text-lg font-semibold"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white text-lg font-semibold mr-6">Login</Link>
                            <Link to="/signup" className="text-white text-lg font-semibold">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
