import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";  // Correct imports
const router = express.Router();

router.post("/register", registerUser);  // Updated function name
router.post("/login", loginUser);  // Updated function name

export default router;
