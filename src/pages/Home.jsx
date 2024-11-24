import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { token, isLoggedIn } = useAuth();
    const [lostItems, setLostItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const response = await axios.get("http://localhost:5176/items/lost", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const unclaimedItems = response.data.filter((item) => !item.isClaimed);
                setLostItems(unclaimedItems.slice(0, 3)); // Preview only 3 unclaimed items
            } catch (error) {
                console.error("Error fetching lost items:", error);
            }
        };

        const fetchFoundItems = async () => {
            try {
                const response = await axios.get("http://localhost:5176/items/found", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const unclaimedItems = response.data.filter((item) => !item.isClaimed);
                setFoundItems(unclaimedItems.slice(0, 3)); // Preview only 3 unclaimed items
            } catch (error) {
                console.error("Error fetching found items:", error);
            }
        };

        if (isLoggedIn) {
            fetchLostItems();
            fetchFoundItems();
        }
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
                {lostItems.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {lostItems.map((item) => (
                            <div
                                key={item._id}
                                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300">{item.description}</p>
                                <p className="text-sm text-gray-400 mt-1">Location: {item.location}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 italic">No lost items available to claim at the moment.</p>
                )}
            </div>

            {/* Found Items Section */}
            <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Found Items</h2>
                {foundItems.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {foundItems.map((item) => (
                            <div
                                key={item._id}
                                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300">{item.description}</p>
                                <p className="text-sm text-gray-400 mt-1">Location: {item.location}</p>
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
