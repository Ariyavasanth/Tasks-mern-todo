import { createContext, useState, useEffect } from "react";
import { apiFetch } from "../api/apiFetch";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const checkUser = async () => {
    try {
      const res = await apiFetch("http://localhost:3000/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // 🔥 NEW FUNCTION
  const requireAuth = (callback) => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      callback();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        requireAuth,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};