import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Header from '../components/Header'; // ✅ Import Header

export default function ChairmanNoticeBoard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [attachment, setAttachment] = useState(null);
  const [notices, setNotices] = useState([]);

  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notices');
      setNotices(res.data);
    } catch (err) {
      console.error('Failed to load notices:', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) return alert('All fields required');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      formData.append('postedBy', email);
      if (attachment) formData.append('attachment', attachment);

      await axios.post('http://localhost:5000/api/notices', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Notice posted ✅');
      setTitle('');
      setContent('');
      setCategory('General');
      setAttachment(null);
      await fetchNotices();
    } catch (err) {
      console.error('❌ Failed to post notice with file:', err);
      alert('Failed to post notice ❌');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/notices/${id}`);
      setNotices((prev) => prev.filter((n) => n._id !== id));
      alert('Notice deleted ✅');
    } catch (err) {
      console.error('Error during DELETE:', err.response?.data || err.message);
      alert('Failed to delete ❌');
    }
  };

  const handleDownloadPDF = async (noticeId) => {
    const element = document.getElementById(`notice-${noticeId}`);
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save(`notice-${noticeId}.pdf`);
  };

  return (
    <div>
      <Header /> {/* ✅ Add the Header */}
      <div className="container">
        <h2>📢 Chairman Notice Board</h2>

        {/* 🔹 Form to Post Notice */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Notice Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ marginTop: '0.5rem', padding: '0.4rem' }}
          >
            <option value="General">📁 General</option>
            <option value="Holiday">🏖️ Holiday</option>
            <option value="Urgent">⚠️ Urgent</option>
            <option value="Meeting">📅 Meeting</option>
          </select>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
            accept="image/*,.pdf"
            style={{ marginTop: '0.5rem' }}
          />
          <br />
          <button type="submit" style={{ marginTop: '10px' }}>
            Post Notice
          </button>
        </form>

        {/* 🔹 All Notices */}
        <div>
          <h3>📄 All Notices</h3>
          {notices.length === 0 ? (
            <p>No notices posted yet.</p>
          ) : (
            notices.map((notice) => (
              <div
                key={notice._id}
                id={`notice-${notice._id}`}
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '6px',
                }}
              >
                <h4>{notice.title}</h4>
                <p>{notice.content}</p>
                <p><strong>📂 Category:</strong> {notice.category || 'General'}</p>
                <small>📨 Posted by: {notice.postedBy}</small><br />
                <small>🕒 {new Date(notice.createdAt).toLocaleString()}</small>

                {/* 📎 Show attachment */}
                {notice.attachment && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {notice.attachment.endsWith('.pdf') ? (
                      <a
                        href={`http://localhost:5000/api/notices/uploads/${notice.attachment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📎 View PDF Attachment
                      </a>
                    ) : (
                      <img
                        src={`http://localhost:5000/api/notices/uploads/${notice.attachment}`}
                        alt="Attachment"
                        style={{ maxWidth: '100%', marginTop: '10px' }}
                      />
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    onClick={() => handleDownloadPDF(notice._id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: 'green',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  >
                    📄 Download PDF
                  </button>

                  {role === 'chairman' && (
                    <button
                      onClick={() => handleDelete(notice._id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
