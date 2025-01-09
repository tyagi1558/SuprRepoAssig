import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` for React 18+
import App from './App';
import './index.css'; // Add basic styling here

const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
