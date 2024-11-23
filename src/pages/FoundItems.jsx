import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoundItems = () => {
    const [foundItems, setFoundItems] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:5176/items/found');
                setFoundItems(data);

                const storedUser = JSON.parse(localStorage.getItem('user'));
                setUser(storedUser);
            } catch (error) {
                console.error('Error fetching found items:', error);
            }
        };

        fetchData();
    }, []);

    const handleClaim = async (id) => {
        try {
            const token = localStorage.getItem('authToken'); // Ensure user is authenticated
            if (!token) {
                alert('You must be logged in to claim an item.');
                return;
            }
    
            const response = await axios.put(
                `http://localhost:5176/items/found/claim/${id}`,
                {}, // No body needed for this request
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            alert('Item successfully marked as claimed.');
            console.log('Response:', response.data);
            // Optionally refresh the list of found items
        } catch (error) {
            console.error('Error claiming found item:', error.response?.data || error.message);
            alert('Failed to claim the item. Make sure you are authorized.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Found Items</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {foundItems.map((item) => (
                    <div key={item._id} className="bg-white shadow-md rounded p-4">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p>{item.description}</p>
                        <p><strong>Location:</strong> {item.location}</p>
                        <p><strong>Contact:</strong> {item.contact}</p>
                        {item.images?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt="Found Item"
                                className="w-full h-32 object-cover mt-2"
                            />
                        ))}
                        {/* <div className="mt-4">
                            {item.isClaimed ? (
                                <p className="text-green-600 font-semibold">Claimed</p>
                            ) : user && item.postedBy === user._id ? (
                                <button
                                    onClick={() => handleClaim(item._id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Mark as Claimed
                                </button>
                            ) : (
                                <p className="text-red-600 font-semibold">Not Claimed</p>
                            )}
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoundItems;
