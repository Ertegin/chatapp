import Chat from "./components/Chat";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";


// const params = new URLSearchParams(window.location.search);
// const roomId = params.get("room") || "default-room";

const ChatWrapper = () => {
  const { roomId } = useParams();
  return <Chat roomId={roomId} />;
};

function App() {

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
