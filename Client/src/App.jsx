import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import ProtectedRoute from "./components/ProtuctedRoute.jsx";
import LoginModal from "./components/LoginModal";

import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import EditName from "./pages/EditName";

import { AuthProvider, AuthContext } from "./context/AuthContext";

const AppRoutes = () => {
  const { showLoginModal, setShowLoginModal } =
    useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Home is Public */}
        <Route path="/" element={<Home />} />

        {/* Protected Pages */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-name"
          element={
            <ProtectedRoute>
              <EditName />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* 🔥 GLOBAL LOGIN MODAL */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;