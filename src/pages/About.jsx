import React from 'react';

const About = () => {
    const teamMembers = [
        { name: 'Kriti Monga', email: 'kmonga_be22@thapar.edu' },
        { name: 'Jaismeen Kaur', email: 'jkaur_be22@thapar.edu' },
        { name: 'Babandeep Kaur', email: 'bkaur1_be22@thapar.edu' },
        { name: 'Ekleen Kaur', email: 'ekaur_be22@thapar.edu' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                    About Us
                </h1>
                <p className="text-lg text-gray-300 mb-12 leading-relaxed animate-fade-in">
                    Welcome to the Lost and Found system! This platform is designed to make it easier for 
                    students, faculty, and staff at Thapar University to recover their lost items or report 
                    items they’ve found. It’s a reliable and user-friendly solution to keep the community connected.
                </p>

                <h2 className="text-3xl font-semibold mb-4 animate-fadeInUp animation-delay-200">
                    Project Features
                </h2>
                <ul className="text-gray-300 mb-12 space-y-4 list-disc list-inside animate-fadeInUp animation-delay-200">
                    <li>
                        Lost Application Form: A dedicated form to report lost items with key details such as description, location, and contact info.
                    </li>
                    <li>
                        Found Application Form: A simple interface to report items found on campus with similar details.
                    </li>
                    <li>
                        Browse Items: Easily view all reported lost or found items with descriptions and images.
                    </li>
                    {/* <li>
                        Email Integration: An automated bot scrapes emails from Captain Manjit Singh’s inbox for reported items.
                    </li> */}
                    <li>
                        Authentication: Only Thapar University email IDs can be used for login and registration.
                    </li>
                </ul>

                <h2 className="text-3xl font-semibold mb-4 animate-fadeInUp animation-delay-200">
                    Our Team
                </h2>
                <div className="space-y-6">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
                        >
                            <h3 className="text-xl font-medium">{member.name}</h3>
                            <p className="text-gray-400">{member.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
