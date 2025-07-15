import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('wss://echo.websocket.org'); // public echo server for testing

function Chat({ username }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', `${username}: ${message}`);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <div className="chat-box">
      <h2>Welcome, {username} 👋</h2>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className="message">{msg}</div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
