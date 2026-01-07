import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Rooms from "./pages/Rooms";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protegido */}
      <Route
        path="/rooms"
        element={
          <PrivateRoute>
            <Rooms />
          </PrivateRoute>
        }
      />

      <Route
        path="/chat/:roomId"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/rooms" />} />
    </Routes>
  );
}

export default App;
