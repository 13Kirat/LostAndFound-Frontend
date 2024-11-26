import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        toast.success('Thank you for reaching out! We will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-center mb-6">Contact Us</h1>
                <p className="text-lg text-gray-300 text-center mb-12">
                    Have questions or need assistance? Reach out to us using the form below or via email. We’re here to help!
                </p>

                {/* Contact Details */}
                <div className="grid gap-6 mb-12 md:grid-cols-2">
                    <div className="p-6 border border-gray-700 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Our Address</h2>
                        <p>Thapar University, Patiala, Punjab, India</p>
                    </div>
                    <div className="p-6 border border-gray-700 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Email Us</h2>
                        <p>
                            For queries or support, write to us at{' '}
                            <a href="mailto:support@thapar.edu" className="text-blue-400">
                                support@thapar.edu
                            </a>
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="w-full mt-2 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            required
                            className="w-full mt-2 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here"
                            rows="4"
                            required
                            className="w-full mt-2 p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
