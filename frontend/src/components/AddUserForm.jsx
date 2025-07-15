// src/components/AddUserForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddUserForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:5000/api/seed/add-user',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`✅ ${res.data.message}`);

      // Reset form
      setFormData({ username: '', email: '', password: '', role: '' });

      // Redirect after short delay
      setTimeout(() => {
        navigate('/chairman/dashboard');
      }, 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || 'Failed to add user. Check your input.';
      setMessage(`❌ ${errorMsg}`);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '2rem' }}>
      <h2>Add New User (Admin Panel)</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="team_lead">Team Lead</option>
          <option value="manager">Manager</option>
          <option value="hod">HOD</option>
          <option value="director">Director</option>
          <option value="vp">VP</option>
          <option value="ceo">CEO</option>
          <option value="chairman">Chairman</option>
        </select>

        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
