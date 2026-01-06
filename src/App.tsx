import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuth } from "./context/AuthContext";


const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redireciona /chat para /chat/geral */}
        <Route
          path="/chat"
          element={<Navigate to="/chat/geral" replace />}
        />

        <Route
          path="/chat/:roomId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
};

export default App;
