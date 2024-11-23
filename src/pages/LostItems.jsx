import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LostItems = () => {
    const { token, user } = useAuth(); // Include user from global state
    const [lostItems, setLostItems] = useState([]);

    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const response = await axios.get("http://localhost:5176/items/lost", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data)
                setLostItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLostItems();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5176/items/lost/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLostItems(lostItems.filter((item) => item._id !== id));
            alert("Lost item deleted successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to delete the item.");
        }
    };

    const handleClaim = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:5176/items/lost/claim/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Update the local state with the claimed item
            setLostItems(
                lostItems.map((item) =>
                    item.id === id ? { ...item, isClaimed: true } : item
                )
            );
            alert("Item claimed successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to claim the item.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Lost Items</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {lostItems.map((item) => (
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
                        {/* Claim functionality */}
                        {user && user.id == item.postedBy && (
                            <div className="mt-2">
                                {!item.isClaimed ? <button
                                    onClick={() => handleClaim(item._id)}
                                    className="text-blue-500 font-semibold"
                                >
                                    Claim this Item
                                </button> : "Claimed"}
                            </div>
                        )}
                        {item.isClaimed && "Claimed"}

                        {/* Display delete button only if the user is the owner */}
                        {user && user.id === item.postedBy && (
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

export default LostItems;
