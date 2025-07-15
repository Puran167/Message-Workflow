import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NotificationPopup from './NotificationPopup';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  const initials = email ? email.charAt(0).toUpperCase() : 'U';

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="header">
      {/* 🔹 Left: Logo + Title */}
      <div className="header-left">
        <span className="emoji">🏢</span>
        <strong className="header-title">Message Workflow System</strong>
      </div>

      {/* ☰ Hamburger icon (mobile only) */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* 🔹 Slide-in Menu */}
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        {['employee', 'team_lead', 'manager', 'hod', 'director', 'vp', 'ceo'].includes(role) && (
          <>
            <Link to="/submit" onClick={() => setMenuOpen(false)}>✉️ Submit</Link>
            <Link to="/my-messages" onClick={() => setMenuOpen(false)}>📬 My Messages</Link>
          </>
        )}
        {['hod', 'director', 'vp', 'ceo', 'chairman'].includes(role) && (
          <Link to="/approvals" onClick={() => setMenuOpen(false)}>✅ Approvals</Link>
        )}
        <Link to="/notice-board" onClick={() => setMenuOpen(false)}>📢 Notices</Link>
        {role === 'chairman' && (
          <Link to="/chairman/post-notice" onClick={() => setMenuOpen(false)}>📝 Post Notice</Link>
        )}
        
        {/* ✅ Add New Employee (CEO/Chairman only) */}
        {['ceo', 'chairman'].includes(role) && (
          <Link to="/admin/add-user" onClick={() => setMenuOpen(false)}>➕ Add New Employee</Link>
        )}
      </nav>

      {/* 🔹 Right: Notifications + Avatar + Logout */}
      <div className="header-right">
        <NotificationPopup />
        <div title={`${email} (${role?.toUpperCase()})`} className="avatar">
          {initials}
        </div>
        <button onClick={handleLogout} className="logout-btn">🔓 Logout</button>
      </div>
    </header>
  );
}
