import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LostItems = () => {
    const { token, user } = useAuth();
    const [lostItems, setLostItems] = useState([]);

    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const response = await axios.get("https://lostandfound-backend-2xpm.onrender.com/items/lost", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLostItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLostItems();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://lostandfound-backend-2xpm.onrender.com/items/lost/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLostItems(lostItems.filter((item) => item._id !== id));
            toast.success("Lost item deleted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete the item.");
        }
    };

    const handleClaim = async (id) => {
        try {
            const response = await axios.put(
                `https://lostandfound-backend-2xpm.onrender.com/items/lost/claim/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLostItems(
                lostItems.map((item) =>
                    item._id === id ? { ...item, isClaimed: true } : item
                )
            );
            toast.success("Item claimed successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to claim the item.");
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6">Lost Items</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {lostItems.length > 0 ? (
                    lostItems.map((item) => (
                        <div
                            key={item._id}
                            className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${item.isClaimed
                                    ? "bg-green-800 border-4 border-green-500"
                                    : "bg-gray-800"
                                }`}
                        >
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {item.title}
                            </h3>

                            {/* Images section */}
                            {item.images?.length > 0 ? (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {item.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Lost Item ${index + 1}`}
                                            className="w-full h-56 object-contain rounded shadow"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">No images available.</p>
                            )}

                            <p className="text-gray-300 mt-2">Description: {item.description}</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Location: {item.location}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                Contact: {item.contact}
                            </p>

                            {/* Claim Status */}
                            <p className="text-sm text-gray-400 mt-1">
                                Status: {item.isClaimed ? "Claimed" : "Unclaimed"}
                            </p>

                            {/* Action buttons */}
                            {user && user.id === item.postedBy && (
                                <div className="flex gap-4 mt-4">
                                    {!item.isClaimed && (
                                        <button
                                            onClick={() => handleClaim(item._id)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-500 transition"
                                        >
                                            Claim this Item
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-500 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 col-span-full text-center">
                        No lost items available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default LostItems;
