import Chat from "./components/Chat";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Loader from "./components/Loader";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

// const params = new URLSearchParams(window.location.search);
// const roomId = params.get("room") || "default-room";

const ChatWrapper = () => {
  const { roomId } = useParams();
  return <Chat roomId={roomId} />;
};

function App() {
   const { user, loading } = useContext(AuthProvider.Context);
  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat/:roomId" element={<ChatWrapper />} />
        <Route path="/" element={<Navigate to="/chat/default-room" replace />} />
        <Route path="*" element={<Navigate to="/chat/default-room" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
// http://localhost:5173/chat/test
export default App;
