import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: username,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      );
      if (res.data.token) {
        Cookies.set("token", res.data.token); 
      }
      alert("Registration successful!");
      navigate("/home");
    } catch (e) {
      console.error(
        "Error during registration:",
        e.response?.data || e.message
      );
      alert(
        e.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-gray-900 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://tint.creativemarket.com/QkQNowZ6ZViVEyWFtE_KCmPZo30M1Sf7plY9zTgv7mY/width:1820/height:1206/gravity:ce/rt:fill-down/el:1/preset:cm_watermark_retina/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzUxMzQvNTEzNDMvNTEzNDM4MTkvNjE4ODkwNzQtby5qcGcjMTcyMzUzOTExOA?1723539118')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Form Box */}
        <div className="relative w-96 p-10 bg-black/50 rounded-lg shadow-[0_15px_25px_rgba(0,0,0,0.6)]">
          <h2 className="text-center text-white text-2xl mb-8">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="relative mb-8">
              <input
                id="username"
                type="text"
                required
                onChange={(e) => setUsername(e.target.value)}
                className="peer w-full border-0 border-b border-white bg-transparent text-white text-base px-0 py-2 focus:outline-none focus:border-cyan-400"
                placeholder=" "
                value={username}
              />
              <label
                htmlFor="username"
                className="absolute left-0 top-2 text-white text-base transition-all duration-500 
          peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400 
          peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-cyan-400"
              >
                Username
              </label>
            </div>

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

            <div className="relative mb-8">
              <input
                id="confirm-password"
                type="password"
                required
                placeholder=" "
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="peer w-full border-0 border-b border-white bg-transparent text-white text-base px-0 py-2 focus:outline-none focus:border-cyan-400"
              />
              <label
                htmlFor="confirm-password"
                className="absolute left-0 top-2 text-white text-base transition-all duration-500 
          peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400 
          peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-cyan-400"
              >
                Confirm Password
              </label>
            </div>

            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="relative inline-block px-6 py-3 text-cyan-400 uppercase tracking-widest text-sm 
          transition-all duration-300 hover:text-white hover:bg-cyan-500 rounded-md"
              >
                Register
              </button>
            </div>
            <h2 className="text-center mt-4">
              <span className="text-white text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-cyan-400 underline">
                  Login
                </a>
              </span>
            </h2>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
