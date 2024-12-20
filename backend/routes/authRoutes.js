import express from "express";
import { registerUser, loginUser, protectedRoute, getUserByUsername } from "../controllers/authController.js"; // Add getUserByUsername
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", authMiddleware, protectedRoute);
router.get("/user/:username", getUserByUsername); // New route to get user by username

export default router;
