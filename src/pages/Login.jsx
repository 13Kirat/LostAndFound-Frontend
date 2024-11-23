import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5176/auth/login', formData);
            toast.success('Login successful!');
            console.log(data);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate("/");
        } catch (err) {
            toast.error(`Error: ${err.response?.data?.message || "Something went wrong!"}`);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>

                {/* Sign Up Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
