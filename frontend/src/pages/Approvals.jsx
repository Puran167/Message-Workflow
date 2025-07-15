import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

export default function Approvals() {
  const [messages, setMessages] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages')
      .then(res => {
        const pending = res.data.filter(msg => {
          return (
            msg.status === 'pending' &&
            !msg.approvals.some(a => a.role === role)
          );
        });
        setMessages(pending);
      })
      .catch(err => console.error(err));
  }, [role]);

  const handleDecision = async (id, decision) => {
    try {
      await axios.put(`http://localhost:5000/api/messages/${id}/approve`, {
        role,
        decision,
      });
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      alert('Approval failed');
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h2>Pending Messages for {role.toUpperCase()}</h2>
        {messages.length === 0 ? (
          <p>No messages to approve.</p>
        ) : (
          messages.map(msg => (
            <div key={msg._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <h4>{msg.title}</h4>
              <p>{msg.content}</p>
              <button onClick={() => handleDecision(msg._id, 'approve')}>✅ Approve</button>
              <button onClick={() => handleDecision(msg._id, 'reject')} style={{ marginLeft: '10px' }}>❌ Reject</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
