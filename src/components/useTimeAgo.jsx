import { useState, useEffect } from "react";

export const useTimeAgo = (timestamp) => {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((prev) => prev + 1);
    }, 60000); 

      const cleanup = () => {
    clearInterval(interval);
  };

  return cleanup;
  }, []);

  return formatTimeAgo(timestamp);
};

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "";
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 10) return "az önce";
  if (seconds < 60) return `${seconds} saniye önce`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} dakika önce`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} saat önce`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} gün önce`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ay önce`;

  return new Date(timestamp).toLocaleDateString("tr-TR");
};

