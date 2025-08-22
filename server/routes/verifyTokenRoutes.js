import express from "express";
import verifyToken from "../middleware/verification.js";

const router = express.Router();

router.post("/", verifyToken, (req, res) => {
  res.json({ tokenValid: true, user: req.user });
});

export default router;
