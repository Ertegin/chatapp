import { useState, useEffect } from "react";
import { ref, onValue, query, orderByChild,equalTo } from "firebase/database";
import { db } from "../db/firebase";

export const useMessages = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (!roomId) {
      return;
    }
    const messagesRef = query(
      ref(db, `rooms/${roomId}/messages`),
      orderByChild("isApproved"),
      equalTo(true)
    );
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        
       const messageList = Object.entries(data)
          .map(([id, msg]) => ({
            id,
            ...msg,
            likeCount: msg.likeCount || 0,
            likes: msg.likes || {},
          }))
          .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        setMessages(messageList);
      } else {
        setMessages([]);
      }
      setLoading(false);
    });

    return unsubscribe
  }, [roomId]);

  return { messages, loading };
};
