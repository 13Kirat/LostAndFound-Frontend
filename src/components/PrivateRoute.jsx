import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            return <Navigate to="/login" />;
        }

        // Token is valid
        return children;
    } catch (err) {
        // Invalid token
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
