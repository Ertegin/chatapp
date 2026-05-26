import { useState, useEffect } from "react";
import { ref, onValue, query, orderByChild } from "firebase/database";
import { db } from "../db/firebase";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const messagesRef = query(ref(db, "pending"), orderByChild("createdAt"));

   
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {

        const messageList = Object.entries(data).map(([id, msg]) => ({
          id,
          ...msg,
          likeCount: msg.likeCount || 0,
          likes: msg.likes || {},
        }));
        setMessages(messageList);
      } else {
        setMessages([]);
      }
      setLoading(false);
    });

    return unsubscribe
  }, []);

  return { messages, loading };
};
