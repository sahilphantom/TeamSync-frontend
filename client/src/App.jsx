import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ChatPage from "./pages/chat/ChatPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected chat routes */}
      <Route
        path="/chat/*"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
