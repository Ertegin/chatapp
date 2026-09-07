import React, { useState, useEffect, useRef, useContext } from "react";
import { useMessages } from "./useMessages";
import Message from "./Message";
import MessageInput from "./MessageInput";
import Loader from "./Loader";
import { FiSun, FiMoon } from "react-icons/fi";
import "../styles/Chat.css";
import { ThemeProvider } from "../context/ThemeContext";

const Chat = ({ roomId = "default-room" }) => {
  const { messages, loading } = useMessages(roomId);
  const [username, setUsername] = useState(
    () => localStorage.getItem("chat_username") || ""
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
 
  const { theme, toggleTheme } = useContext(ThemeProvider.Context);

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
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
      </header>

      <div className="messages-list">
        {messages.length === 0 ? (
          <p className="empty-state">Empty</p>
        ) : (
          messages.map((msg) => <Message key={msg.id} message={msg} roomId={roomId} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput username={username} roomId={roomId} />
    </div>
  );
};

export default Chat;
