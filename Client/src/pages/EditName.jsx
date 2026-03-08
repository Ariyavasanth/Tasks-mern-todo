import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/apiFetch.js";

const EditName = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await apiFetch("/api/auth/me");

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setName(data.name);
    };

    fetchUser();
  }, [navigate]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await apiFetch("/api/profile/details", {
        method: "PUT",
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
    <div>
      {/* your UI */}
    </div>
  );
};

export default EditName;