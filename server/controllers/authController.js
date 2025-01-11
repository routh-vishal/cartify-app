import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from 'dotenv';
import { validationResult } from "express-validator";
dotenv.config();
// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET;

// Signup logic
export const signupUser = async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    res.status(201).json({ success: true, user: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login logic
export const loginUser = async (req, res) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user.rows[0].id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,         // JWT token for authentication
      id: user.rows[0].id, // UUID of the user for identification
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
