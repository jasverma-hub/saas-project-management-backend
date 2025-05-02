import express from "express";
import { updateUser, getCurrentUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, getCurrentUser); // 🔐 Profile
router.put("/:id", verifyToken, updateUser);

export default router;
