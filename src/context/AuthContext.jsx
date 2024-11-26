import React, { createContext, useState, useContext } from "react";
import { toast } from 'react-toastify';

// Create Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: !!localStorage.getItem("authToken"),
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("authToken") || null,
    });

    // Function to log in the user
    const login = (userData, token) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setAuthState({ isLoggedIn: true, user: userData, token });
    };

    // Function to log out the user
    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setAuthState({ isLoggedIn: false, user: null, token: null });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
