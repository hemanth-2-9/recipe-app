import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      alert("Login successful!");
      navigate("/home");
    } catch (e) {
      console.error("Error during login:", e);
      alert(
        e.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative w-96 p-10 bg-black/50 rounded-lg shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
          <h2 className="text-center text-white text-2xl mb-8">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-8">
              <input
                id="email"
                type="email"
                required
                className="peer w-full border-0 border-b border-white bg-transparent text-white text-base px-0 py-2 focus:outline-none focus:border-cyan-400"
                placeholder=" "
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-2 text-white text-base transition-all duration-500  
       peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400  
       peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-cyan-400"
              >
                Email
              </label>
            </div>

            <div className="relative mb-8">
              <input
                id="password"
                type="password"
                required
                placeholder=" "
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="peer w-full border-0 border-b border-white bg-transparent text-white text-base px-0 py-2 focus:outline-none focus:border-cyan-400"
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-2 text-white text-base transition-all duration-500  
       peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400  
       peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-cyan-400"
              >
                Password
              </label>
            </div>

            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="relative inline-block px-6 py-3 text-cyan-400 uppercase tracking-widest text-sm  
       transition-all duration-300 hover:text-white hover:bg-cyan-500 rounded-md"
              >
                Login
              </button>
            </div>
            <h2 className="text-center mt-4">
              <span className="text-white text-sm">
                Don't have an account?{" "}
                <a href="/register" className="text-cyan-400 underline">
                  Register
                </a>
              </span>
            </h2>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
