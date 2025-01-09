import React, { useState } from 'react';
import './Session.css';

const SessionControls = ({ onJoin, onCreate }) => {
  const [roomId, setRoomId] = useState(''); 
  const [roomName, setRoomName] = useState(''); 
  const [isCreating, setIsCreating] = useState(false);  

  const toggleMode = () => {
    setIsCreating(!isCreating);
    setRoomId('');
    setRoomName('');
  };

  return (
    <div className="session-controls">
      {isCreating && (
        <div className="room-name-input">
          <input
            type="text"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
      )}

      <div className="room-id-input">
        <input
          type="text"
          placeholder={isCreating ? 'Enter Room ID' : 'Enter Room ID to Join'}
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>

      {isCreating ? (
        <div className="create-room-button">
          <button onClick={() => onCreate(roomId, roomName)}>Create</button>
        </div>
      ) : (
        <div className="join-room-button">
          <button onClick={() => onJoin(roomId)}>Join</button>
        </div>
      )}

      <div className="footer-message">
        {isCreating ? (
          <span>Already have a room? <span className="toggle-link" onClick={toggleMode}>Join a Room</span></span>
        ) : (
          <span>Don't have a room? <span className="toggle-link" onClick={toggleMode}>Create a Room</span></span>
        )}
      </div>
    </div>
  );
};

export default SessionControls;
