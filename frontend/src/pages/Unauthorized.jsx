import React from 'react';

export default function Unauthorized() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>403 - Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
}
