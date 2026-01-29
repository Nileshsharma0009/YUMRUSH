import React from 'react' ;
import ReactDOM from 'react-dom/client' ;
import App from './App.jsx' ;
import './index.css' ;


const root = ReactDOM.createRoot(document.getElementById('root')) ;
// Log runtime env for debugging in production (removable after verification)
console.info('Runtime ENV:', {
  API_URL: process.env.API_URL,
  SOCKET_URL: process.env.SOCKET_URL,
  NODE_ENV: process.env.NODE_ENV,
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);