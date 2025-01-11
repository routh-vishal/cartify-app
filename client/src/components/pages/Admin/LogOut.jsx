import React from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken"); // Clear the session token
    sessionStorage.removeItem("id"); // Clear the session token
    alert("You have been logged out.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <button onClick={handleLogout} style={{ padding: "10px 20px", cursor: "pointer" }}>
      Logout
    </button>
  );
}

export default LogOut;