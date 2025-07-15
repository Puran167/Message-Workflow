import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // optional

export default function SubmitMessage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recipient, setRecipient] = useState('hod');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const email = localStorage.getItem('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await axios.post('http://localhost:5000/api/messages', {
        title,
        content,
        recipient,
        submittedByEmail: email,
      });

      setSuccess('✅ Message submitted successfully!');
      setTitle('');
      setContent('');
      setRecipient('hod');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to submit message.');
    }
  };

  return (
    <div style={styles.page}>
      <Header />
      <div style={styles.formContainer}>
        <h2>Submit a Message</h2>

        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Message Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />

          <textarea
            placeholder="Your Message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="5"
            style={styles.textarea}
          />

          <select value={recipient} onChange={(e) => setRecipient(e.target.value)} style={styles.select}>
            <option value="hod">HOD</option>
            <option value="director">Director</option>
            <option value="vp">Vice President</option>
            <option value="ceo">CEO</option>
            <option value="chairman">Chairman</option>
          </select>

          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  formContainer: {
    maxWidth: '600px',
    margin: '40px auto',
    background: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 10px #ccc',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};
