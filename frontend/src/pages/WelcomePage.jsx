import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <h1>Welcome to the Message Approval System</h1>
      <p>This platform routes messages hierarchically for approval.</p>
      <div style={styles.buttonGroup}>
        <button onClick={() => navigate('/login')} style={styles.button}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    textAlign: 'center',
    marginTop: '5rem',
  },
  buttonGroup: {
    marginTop: '2rem',
  },
  button: {
    margin: '0 1rem',
    padding: '0.7rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};
