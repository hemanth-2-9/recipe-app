import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify", {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);

  // yahan pehle loading state dikhegi.
  if (isAuthenticated === null) {
    return(
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <PacmanLoader color="#FFA829" size={42} />
        <p className="text-white text-lg font-semibold animate-pulse">
          Verifying session...
        </p>
      </div>
    </div>
  );
  }

  // Agar user authenticated nahi hai, toh redirect karo.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar authenticated hai, toh home page dikha do.
  return children;
}

export default ProtectedRoute;
