import React from 'react';

const ItemCard = ({ item }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 transition-transform transform hover:scale-105">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-1">
            <span className="font-semibold">Description: </span>{item.description}
        </p>
        <p className="text-gray-600 text-sm mb-1">
            <span className="font-semibold">Location: </span>{item.location}
        </p>
        <p className="text-gray-600 text-sm mb-1">
            <span className="font-semibold">Status: </span>{item.status}
        </p>
        <p className="text-gray-600 text-sm mb-1">
            <span className="font-semibold">Type: </span>{item.isLost ? 'Lost' : 'Found'}
        </p>
        <p className="text-gray-600 text-sm">
            <span className="font-semibold">Reported By: </span>{item.reportedBy.username}
        </p>
    </div>
);

export default ItemCard;
