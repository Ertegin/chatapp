import React, { useState, useEffect, useRef } from "react";
import { useMessages } from "./useMessages";
import Message from "./Message";
import MessageInput from "./MessageInput";
import Loader from "./Loader";
import "../styles/Chat.css";

const Chat = () => {
  const { messages, loading } = useMessages();
  const [username, setUsername] = useState(
    () => localStorage.getItem("chat_username") || ""
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
 

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    localStorage.setItem("chat_username", value);
  };

  if (loading) return <Loader />;

  return (
    <div className="chat-container">
      <header className="chat-header">
        <input
          type="text"
          placeholder="Nick"
          value={username}
          onChange={handleUsernameChange}
          className="username-input"
        />
      </header>

      <div className="messages-list">
        {messages.length === 0 ? (
          <p className="empty-state">Empty</p>
        ) : (
          messages.map((msg) => <Message key={msg.id} message={msg} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput username={username} />
    </div>
  );
};

export default Chat;
