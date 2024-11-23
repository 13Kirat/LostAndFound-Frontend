import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const FoundItems = () => {
    const { token, user } = useAuth(); // Include user from global state
    const [foundItems, setFoundItems] = useState([]);

    useEffect(() => {
        const fetchFoundItems = async () => {
            try {
                const response = await axios.get("http://localhost:5176/items/found", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFoundItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFoundItems();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5176/items/found/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFoundItems(foundItems.filter((item) => item._id !== id));
            alert("Found item deleted successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to delete the item.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Found Items</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {foundItems.map((item) => (
                    <div key={item._id} className="border p-4 rounded shadow">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        {item.images?.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {item.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Lost Item ${index + 1}`}
                                        className="w-full h-32 object-cover rounded shadow"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No images available.</p>
                        )}
                        <p className="mb-2">{item.description}</p>
                        <p className="text-sm text-gray-600">Location: {item.location}</p>
                        {user && user._id === item.userId && ( // Check if the user is the owner
                            <div className="mt-2">
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="text-red-500 font-semibold"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoundItems;
