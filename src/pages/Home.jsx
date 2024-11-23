import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     if (!token) {
    //         navigate("/login")
    //     }
    // }, []);

    useEffect(() => {
        axios.get('http://localhost:5176/items')
            .then((response) => setItems(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className='p-6'>
            <h1 className="text-4xl font-bold">Welcome to the Lost and Found Portal</h1>
            <p className="mt-4">This is a platform where you can report lost and found items in your campus.</p>
            {items.map((item) => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
    );
};

export default Home;
