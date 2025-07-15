import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMessageById } from '../utils/api';

export default function MessageDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getMessageById(id).then(setMessage);
  }, [id]);

  if (!message) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{message.title}</h2>
      <p>{message.content}</p>
      <h4>Approval Timeline</h4>
      <ul>
        {message.approvals.map((a, i) => (
          <li key={i}>
            {a.role.toUpperCase()} — {a.status} {a.remarks && `(${a.remarks})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
