import { body } from "express-validator";

export const validateSignup = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long.")
    .escape(),
  body("email").isEmail().withMessage("Invalid email format.").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .escape(),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format.").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required.").escape(),
];
