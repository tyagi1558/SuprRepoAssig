import React, { useState, useEffect } from 'react';
import Whiteboard from '../components/Whiteboard';
import Toolbar from '../components/Toolbar';
import SessionControls from '../components/SessionControls';
import { toast } from 'react-toastify'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';

const Home = ({ socket }) => {
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState(''); 
  const { roomId: urlRoomId } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (urlRoomId) {
      setRoomId(urlRoomId);
    }
  }, [urlRoomId]);

  const joinSession = async (id) => {
    try {
      const response = await fetch(`https://suprrepoassig-d605.onrender.com/api/session/room/${id}`);
      const data = await response.json();
      if (data.roomId) {
        setRoomId(id);
        let roomName = data.roomName;
        socket.emit('join-room', id);
        navigate(`/room/${id}`);
          toast.success(`Successfully joined the room: ${roomName}`);
      } else {
        toast.error('Room does not exist.');
      }
    } catch (err) {
      console.error('Error joining room:', err);
      toast.error('Error joining the room.'); 
    }
  };
  

  const createSession = async (id, name) => {
    try {
      const response = await fetch('https://suprrepoassig-d605.onrender.com/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: id, roomName: name }), 
      });
      const data = await response.json();
      if (data.roomId) {
        setRoomId(id);
        socket.emit('create-room', id);
        toast.success(`Room created successfully! Room ID: ${id}`);
        navigate(`/room/${id}`);
      } else {
        toast.error('Error creating the room.'); 
      }
    } catch (err) {
      console.error('Error creating room:', err);
      toast.error('Error creating the room.'); 
    }
  };

  const clearWhiteboard = () => {
  };

  return (
    <div className="home">
      {!roomId ? (
        <SessionControls onJoin={joinSession} onCreate={createSession} />
      ) : (
        <>
          {/* <Toolbar onClear={clearWhiteboard} /> */}
          <Whiteboard socket={socket} roomId={roomId} />
        </>
      )}
    </div>
  );
};

export default Home;
