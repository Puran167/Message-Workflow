import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const roles = [
  'employee',
  'team_lead',
  'manager',
  'hod',
  'director',
  'vp',
  'ceo',
  'chairman',
];

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email: email.toLowerCase().trim(), // ✅ normalize email
        password,
        role,
      });

      const { token, role: userRole, email: userEmail } = res.data;

      // ✅ Save user data
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      localStorage.setItem('email', userEmail);

      // ✅ Redirect to role-based dashboard
      navigate(`/${userRole}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.select}
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r.replace('_', ' ').toUpperCase()}
            </option>
          ))}
        </select>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f1f1f1',
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px #ccc',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '300px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    background: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};
