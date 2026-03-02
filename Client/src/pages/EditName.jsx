import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditName = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setName(data.name);
    };

    fetchUser();
  }, []);

  // 🔹 Save updated name
  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/profile/details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        alert("Failed to update name");
        return;
      }

      navigate("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white shadow-sm">
        <button onClick={() => navigate(-1)} className="text-xl">
          ←
        </button>
        <h2 className="text-lg font-semibold">Edit name</h2>
      </div>

      {/* Input Section */}
      <div className="px-6 mt-8 flex-1">
        <label className="text-gray-500 text-sm">Name</label>

        <div className="relative mt-2">
          <input
            type="text"
            maxLength={64}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b-2 border-green-600 bg-transparent outline-none py-2 text-lg"
          />
        </div>

        <p className="text-right text-gray-400 text-sm mt-1">
          {name.length}/64
        </p>
      </div>

      {/* Save Button */}
      <div className="p-6">
        <button
          disabled={!name.trim() || loading}
          onClick={handleSave}
          className="w-full py-4 rounded-full font-semibold bg-gray-300"
        >
          {loading ? "Saving..." : "SAVE"}
        </button>
      </div>
    </div>
  );
};

export default EditName;