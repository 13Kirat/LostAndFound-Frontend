import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Home = () => {
    const { token, isLoggedIn } = useAuth();
    const [lostItems, setLostItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const response = await axios.get("https://lostandfound-backend-2xpm.onrender.com/items/lost", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const unclaimedItems = response.data.filter((item) => !item.isClaimed);
                setLostItems(unclaimedItems.slice(0, 3)); // Preview only 3 unclaimed items
            } catch (error) {
                toast.error("Error fetching lost items:", error);
            }
        };

        const fetchFoundItems = async () => {
            try {
                const response = await axios.get("https://lostandfound-backend-2xpm.onrender.com/items/found", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const unclaimedItems = response.data.filter((item) => !item.isClaimed);
                setFoundItems(unclaimedItems.slice(0, 3)); // Preview only 3 unclaimed items
            } catch (error) {
                toast.error("Error fetching found items:", error);
            }
        };


        fetchLostItems();
        fetchFoundItems();

    }, [isLoggedIn, token]);

    const handleViewAll = (path) => {
        if (!isLoggedIn) {
            alert("Please log in to view all items.");
            navigate("/login");
        } else {
            navigate(path);
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-6">Welcome to the Lost and Found Portal</h1>
            <p className="text-gray-300 mb-8">
                A platform to help you report and locate lost or found items on campus.
            </p>

            {/* Lost Items Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Lost Items</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">

                    {lostItems.length > 0 ? lostItems.map((item) => (
                        <div
                            key={item._id}
                            className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-800`}
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
                        </div>
                    )) : (
                        <p className="text-gray-400 italic">No lost items available to claim at the moment.</p>
                    )}
                </div>
            </div>

            {/* Found Items Section */}
            <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Found Items</h2>
                {foundItems.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {foundItems.map((item) => (
                            <div
                                key={item._id}
                                className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-gray-800`}
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
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 italic">No found items available to claim at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
