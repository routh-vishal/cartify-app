import React, { useState } from "react";
import axios from "axios";
import "./auth.css"; 
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { FaRegEye } from "react-icons/fa";
function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",  
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formData);
      if (response.data.success) {
        alert("Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"  
          placeholder="Username"
          value={formData.username}  
          onChange={handleChange}
          required
        />
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
            onMouseDown={togglePasswordVisibility} 
            onMouseUp={togglePasswordVisibility}   
            onMouseLeave={() => { setShowPassword(false); }} 
          >
            <FaRegEye />
          </span>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="signup-redirect">
        <p>Already have an account?{" "}</p>
        <button onClick={() => { navigate("/login"); }} className="signup-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
