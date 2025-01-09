import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';

const socket = io('http://localhost:5000', {
  withCredentials: true,  
})

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/room/:roomId" element={<Home socket={socket} />} /> 
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
