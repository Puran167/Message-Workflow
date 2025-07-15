import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

export default function MyMessages() {
  const [messages, setMessages] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages')
      .then(res => {
        const myMessages = res.data.filter(msg => msg.submittedBy === email);
        setMessages(myMessages);
      })
      .catch(err => console.error(err));
  }, [email]);

  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h2>My Submitted Messages</h2>
        {messages.length === 0 ? <p>No messages submitted.</p> :
          messages.map(msg => (
            <div key={msg._id} style={{ marginBottom: '10px' }}>
              <h4>{msg.title}</h4>
              <p>Status: {msg.status.toUpperCase()}</p>
              <p>Approvals: {msg.approvals.map(a => `${a.role}: ${a.approved ? '✔️' : '❌'}`).join(', ')}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
