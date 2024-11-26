import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';

const ReportFound = () => {
    const [formData, setFormData] = useState({ title: '', description: '', location: '', contact: '' });
    const [images, setImages] = useState([]);
    const { user } = useAuth();

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataWithImages = new FormData();
        formDataWithImages.append('title', formData.title);
        formDataWithImages.append('description', formData.description);
        formDataWithImages.append('location', formData.location);
        formDataWithImages.append('contact', formData.contact);
        formDataWithImages.append('user', user.id);

        Array.from(images).forEach((image) => formDataWithImages.append('images', image));

        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post('https://lostandfound-backend-2xpm.onrender.com/items/found', formDataWithImages, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Found item reported successfully!');
            // console.log(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to report found item.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">Report Found Item</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-lg font-medium text-gray-200 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter item title"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full p-4 border border-gray-700 bg-gray-900 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg font-medium text-gray-200 mb-2">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Enter a brief description"
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        className="w-full p-4 border border-gray-700 bg-gray-900 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className="block text-lg font-medium text-gray-200 mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Enter the location"
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        className="w-full p-4 border border-gray-700 bg-gray-900 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="contact" className="block text-lg font-medium text-gray-200 mb-2">Contact Info</label>
                    <input
                        type="text"
                        name="contact"
                        id="contact"
                        placeholder="Enter your contact info"
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        required
                        className="w-full p-4 border border-gray-700 bg-gray-900 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="images" className="block text-lg font-medium text-gray-200 mb-2">Upload Images</label>
                    <input
                        type="file"
                        name="images"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Report Found Item
                </button>
            </form>
        </div>
    );
};

export default ReportFound;
