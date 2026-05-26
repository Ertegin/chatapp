export const getUserId = () => {
  let userId = localStorage.getItem("chat_user_id");
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem("chat_user_id", userId);
  }
  return userId;
};