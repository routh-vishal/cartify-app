import express from "express";
import { signupUser, loginUser } from "../controllers/authController.js";
import { validateSignup, validateLogin } from "../middleware/validation.js";
const router = express.Router();

// Signup Route
router.post("/signup", validateSignup, signupUser);

// Login Route
router.post("/login", validateLogin, loginUser);

export default router;
