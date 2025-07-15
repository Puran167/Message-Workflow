import React from 'react';
import { Link } from 'react-router-dom';

export default function MessageCard({ message }) {
  return (
    <div className="card">
      <h3>{message.title}</h3>
      <p>Status: {message.status}</p>
      <Link to={`/message/${message._id}`}>View Details</Link>
    </div>
  );
}
