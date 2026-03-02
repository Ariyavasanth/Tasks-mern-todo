import React from "react";
import Lottie from "lottie-react";
import LoginAnimation from "../assets/todo_list.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api/apiFetch";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await apiFetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ SET USER BEFORE NAVIGATION
      setUser({ email }); // or data.user if backend sends user

      // ✅ Cookie already set by backend
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9fb]  h-screen p-4  ">
      <Lottie
        className=" w-full  border-amber-200"
        animationData={LoginAnimation}
        loop={true}
        autoplay={true}
      />

      <div>
        <h1 className="text-4xl text-brand-primary font-semibold">Login</h1>
        <p className="text-[14px] mt-1 text-brand-primary font-medium">
          Please Login to Continue
        </p>
      </div>

      <form className="flex flex-col mt-6" onSubmit={handleSubmit}>
        {/* form container */}
        <div className="flex flex-col gap-3 mb-5 ">
          <div
            className="flex gap-2 border-2 border-[#dfe9f1] rounded-4xl p-2 px-4
                focus-within:border-[#5886c7]
                focus-within:ring-2
                focus-within:ring-[#5886c7]/40
                transition"
          >
            {/* mail */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-brand-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none placeholder:font-medium "
              placeholder="Enter your email"
              required
            />
          </div>

          <div
            className="flex gap-2 border-2 border-[#dfe9f1] rounded-4xl p-2 px-4
                focus-within:border-[#5886c7]
                focus-within:ring-2
                focus-within:ring-[#5886c7]/40
                transition"
          >
            {/* lock */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-brand-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

            <input
              type={show ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none placeholder:font-medium"
              placeholder="Password"
              required
            />
            {/* eye */}
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="text-brand-primary"
            >
              {show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-brand-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-brand-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* button container */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="
    bg-brand-primary w-full border rounded-4xl p-2 px-4 
    text-[18px] font-bold text-white
    hover:bg-[#1662ccd6]
    disabled:opacity-60
  "
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>

        <p className="text-center mt-1   text-[14px] font-extralight">
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-brand-primary font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
