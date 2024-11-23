import React from 'react';

const ItemCard = ({ item }) => (
    <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p>Location: {item.location}</p>
        <p>Status: {item.status}</p>
        <p>Type: {item.isLost ? 'Lost' : 'Found'}</p>
        <p>Reported By: {item.reportedBy.username}</p>
    </div>
);

export default ItemCard;
