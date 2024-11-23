import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LostItems = () => {
    const [lostItems, setLostItems] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('http://localhost:5176/items/lost');
            setLostItems(data);

            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUser(storedUser);
        };

        fetchData();
    }, []);

    const handleClaim = async (id) => {
        try {
            await axios.put(
                `http://localhost:5176/items/lost/claim/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                }
            );
            alert('Item marked as claimed.');
            setLostItems((prevItems) =>
                prevItems.map((item) =>
                    item._id === id ? { ...item, isClaimed: true } : item
                )
            );
        } catch (error) {
            console.error(error);
            alert('Failed to mark item as claimed.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Lost Items</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {lostItems.map((item) => (
                    <div key={item._id} className="bg-white shadow-md rounded p-4">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p>{item.description}</p>
                        <p><strong>Location:</strong> {item.location}</p>
                        <p><strong>Contact:</strong> {item.contact}</p>
                        {item.images?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt="Lost Item"
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

export default LostItems;
