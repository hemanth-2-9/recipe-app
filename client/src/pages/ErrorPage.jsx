import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://i.pinimg.com/1200x/5a/cc/bd/5accbd15f6c04fb94687195365f6d56d.jpg")`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center px-6 flex flex-col items-center -mt-10">
        {/* Hollow 404 with glow */}
        <h1
          className="text-[120px] md:text-[220px] font-extrabold text-transparent leading-none drop-shadow-[0_0_15px_rgba(255,179,71,0.7)]"
          style={{
            WebkitTextStroke: "3.5px orange",
          }}
        >
          404
        </h1>

        <p className="text-white text-lg md:text-xl mb-6 max-w-md">
          Oops! You seem lost in space 🚀. The page you're looking for doesn’t
          exist.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="hover:bg-[#FFB347] hover:text-black cursor-pointer text-[#FFB347] px-6 py-2 rounded-xl font-medium shadow-md transition border border-[#FFB347]"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
