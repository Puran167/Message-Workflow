import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Header from '../components/Header'; // ✅ Import Header

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5000/api/notices')
      .then(res => {
        setNotices(res.data);
        setFilteredNotices(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    if (category === 'All') {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(notices.filter(n => n.category === category));
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
      <Header /> {/* ✅ Header inserted here */}
      <div className="container">
        <h2>📰 Public Notice Board</h2>

        {/* 🔍 Filter by category */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="categoryFilter"><strong>Filter by Category: </strong></label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={handleFilterChange}
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="All">All</option>
            <option value="General">General</option>
            <option value="Holiday">Holiday</option>
            <option value="Urgent">Urgent</option>
            <option value="Meeting">Meeting</option>
          </select>
        </div>

        {filteredNotices.length === 0 ? (
          <p>No notices found for selected category.</p>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice._id}
              id={`notice-${notice._id}`}
              style={{
                border: '1px solid #ccc',
                margin: '1rem 0',
                padding: '1rem',
                borderRadius: '6px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              <p><strong>📂 Category:</strong> {notice.category || 'General'}</p>
              <small>
                📨 Posted by: {notice.postedBy} <br />
                🕒 {new Date(notice.createdAt).toLocaleString()}
              </small>

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

              <div style={{ marginTop: '0.5rem' }}>
                <button
                  onClick={() => handleDownloadPDF(notice._id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  📄 Download PDF
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
