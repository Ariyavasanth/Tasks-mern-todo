import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/apiFetch";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiFetch("/api/auth/me");

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // important to send cookies
      });

      // Clear React state
      setUser(null);

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white shadow-sm">
        <button onClick={() => navigate("/")} className="text-xl">
          ←
        </button>
        <h2 className="text-lg font-semibold">Edit Profile</h2>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-36 h-36 rounded-full bg-pink-300 flex items-center justify-center text-white text-3xl font-bold">
          {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
        <button className="mt-3 text-blue-600 font-medium">Edit</button>
      </div>

      {/* Info Section */}
      <div className="mt-10 px-6 space-y-6">
        {/* Name */}
        <div
          onClick={() => navigate("/edit-name")}
          className="border-b pb-3 flex justify-between items-center cursor-pointer"
        >
          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="font-medium">{user?.name || "Loading..."}</p>
          </div>
          <span className="text-gray-400">›</span>
        </div>

        {/* Email */}
        <div className="border-b pb-3 flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="font-medium">{user?.email || ""}</p>
          </div>
          <span className="text-gray-400">›</span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-white mt-6 py-3 rounded-xl shadow-sm font-semibold hover:bg-gray-50 transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
