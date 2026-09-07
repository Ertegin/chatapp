import { useState, useRef, useEffect, useContext } from "react";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { ref, push } from "firebase/database";
import { db } from "../db/firebase";
import { getUserId } from "./UserId";
import EmojiPicker from "emoji-picker-react";
import "../styles/MessageInput.css";
import { AuthProvider } from "../context/AuthContext";

const MessageInput = ({ username,roomId  }) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);
    const { isGuest  } = useContext(AuthProvider.Context);
  const [justSent, setJustSent] = useState(false);


  useEffect(() => {
    
    
    const handleClickOutside = (e) => {
        if (
          pickerRef.current &&
          !pickerRef.current.contains(e.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(e.target)
        ) {
          setShowPicker(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    //disabled={!text.trim() || sending}
    if (!trimmed || sending || !roomId) return;

    setSending(true);
    try {
      //await push(ref(db, "pending"),
      await push(ref(db, `rooms/${roomId}/messages`),
       {
        text: trimmed,
        username: username || "Anonim",
        userId: getUserId(),
        createdAt: new Date().toString(), 
        likeCount: 0,
        isApproved: false,
        approvedBy: null,
      });
      setText("");
      setShowPicker(false);
      setJustSent(true);
      setTimeout(() => setJustSent(false), 4000);

    } catch (error) {
      console.error("Mesaj gönderilemedi:", error);
    } finally {
      setSending(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };
  // Eğer kullanıcı misafir ise form yerine bilgilendirme göster
  if (isGuest) {
    return (
      <div className="guest-notice">
        Misafir olarak izliyorsunuz. Mesaj göndermek için giriş yapın.
      </div>
    );
  }

    if (isGuest) {
    return (
      <div className="guest-notice">
        Misafir olarak izliyorsunuz. Mesaj göndermek için giriş yapın.
      </div>
    );
  }
  return (
    <>
    
       {justSent && (
        <div className="pending-notice">
        Mesaj onay bekliyor
        </div>
      )}
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

        {showPicker && (
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

      <button
        type="submit"
        disabled={!text.trim() || sending}
        className="sendButton"
      >
        <FaPaperPlane />
      </button>
    </form>
    </>
  );
};

export default MessageInput;
