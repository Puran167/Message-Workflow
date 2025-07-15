import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Make sure this path is correct
import './styles.css';   // ✅ Or remove this if not needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
