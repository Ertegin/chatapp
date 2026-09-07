import React, { memo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ref, update, increment } from "firebase/database";
import { db } from "../db/firebase";
import { useTimeAgo } from "./useTimeAgo";
import { getUserId } from "./UserId";
import "../styles/Message.css";

const Message = ({ message ,roomId }) => {
  const time=new Date(message.createdAt)
  const timeAgo=useTimeAgo(time)
  const userId = getUserId();

  const hasLiked = Boolean(message.likes?.[userId]);


  const handleLike = async () => {
    //const messageRef = ref(db, `pending/${message.id}`);
const messageRef = ref(db, `rooms/${roomId}/messages/${message.id}`);

    await update(messageRef, {
      [`likes/${userId}`]: hasLiked ? null : true, 
      likeCount: increment(hasLiked ? -1 : 1),
    });
  };

  return (
    <div className="message">
      <div className="message-header">
        <span className="username">{message.username || "Anonim"}</span>
        <span className="time">{timeAgo}</span>
      </div>
      <p className="message-text">{message.text}</p>
      <button
        className={`like-btn ${hasLiked ? "liked" : ""}`}
        onClick={handleLike}
      >
        {hasLiked ? <FaHeart /> : <FaRegHeart />}
        <span>{message.likeCount}</span>
      </button>
    </div>
  );
};

export default Message;
