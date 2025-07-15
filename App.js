import React, { useState } from 'react';
import Chat from './Chat';
import './index.css';

function App() {
  const [username, setUsername] = useState('');
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    if (username.trim() !== '') {
      setEntered(true);
    }
  };

  return (
    <div className="app">
      {entered ? (
        <Chat username={username} />
      ) : (
        <div className="login-box">
          <h2>Enter your name to start chatting</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleEnter}>Enter Chat</button>
        </div>
      )}
    </div>
  );
}

export default App;
