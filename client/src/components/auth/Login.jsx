import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import validator from "validator";
import { FaRegEye } from "react-icons/fa";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //sanitization
    if (!validator.isEmail(formData.email)) {
      setError("Invalid email format");
      return;
    }

    if (!validator.isLength(formData.password, { min: 6 })) {
      setError("Password must be at least 6 characters");
      return;
    }
    try {
      // Make a POST request to the login API   
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData);
      sessionStorage.setItem("id", response.data.id);
      if (response.data.success) {
        // Save the token in localStorage
        window.sessionStorage.setItem("authToken", response.data.token);
        alert("Login successful!");

        // Redirect to the home page
        navigate("/home");
      }
    } catch (err) {
      // Display error message
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  // Handle redirect to signup page
  const redirectToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="pass-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="show-pass"
            onMouseDown={togglePasswordVisibility} // Show password on hold
            onMouseUp={togglePasswordVisibility}   // Hide password when mouse is released
            onMouseLeave={() => { setShowPassword(false); }} // Hide password if mouse leaves the button
            onTouchStart={togglePasswordVisibility}
            onTouchEnd={togglePasswordVisibility}
          >
            <FaRegEye />
          </span>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="signup-redirect">
        <p>Don't have an account?{" "}</p>
        <button onClick={redirectToSignup} className="signup-button">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
