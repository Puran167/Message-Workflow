import React, { useEffect, useState } from 'react';
import './NotificationPopup.css'; // Add styling

export default function NotificationPopup() {
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Simulate fetching notifications (replace with API later)
    const dummy = [
      { message: 'New message submitted', time: 'Just now' },
      { message: 'Director approved your message', time: '2 mins ago' },
    ];
    setNotifications(dummy);
  }, []);

  return (
    <div className="notification-popup">
      <button onClick={() => setShowPopup(!showPopup)} className="notif-btn">🔔</button>

      {showPopup && (
        <div className="popup-panel">
          <h4>Notifications</h4>
          {notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="notif-item">
                <p>{n.message}</p>
                <small>{n.time}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
