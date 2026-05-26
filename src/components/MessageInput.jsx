import React, { useState ,useRef , useEffect} from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { ref, push, serverTimestamp } from "firebase/database";
import { db } from "../db/firebase";
import { getUserId } from "./UserId";
import EmojiPicker from "emoji-picker-react";
import "../styles/MessageInput.css";

const MessageInput = ({ username }) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isVisible, setIsVisible] = useState(false); 
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (showPicker) {
      setIsVisible(true);
    }
  }, [showPicker]);

  useEffect(() => {
    
    
    const handleClickOutside = (e) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowPicker(false);
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    //disabled={!text.trim() || sending}
    if (!trimmed || sending) return;

    setSending(true);
    try {
      await push(ref(db, "pending"), {
        text: trimmed,
        username: username || "Anonim",
        userId: getUserId(),
        createdAt: new Date().toString(), 
        likeCount: 0,
      });
      setText("");
      setShowPicker(false);
      setIsVisible(false);
    } catch (error) {
      console.error("Mesaj gönderilemedi:", error);
    } finally {
      setSending(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
          className="input-message"
        />

        <button
          type="button"
          onClick={() => setShowPicker((prev) => !prev)}
          ref={buttonRef}
          className="emoji-btn"
        >
          <FaSmile />
        </button>

        {isVisible && (
          <div
            ref={pickerRef}
            className={`emoji-picker-wrapper ${showPicker ? "open" : "close"}`}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={320}
              height={400}
            />
          </div>
        )}
      </div>

      <button type="submit"
       disabled={!text.trim() || sending}
      className="sendButton"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default MessageInput;
