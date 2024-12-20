import express from "express";
import { getWalletBalance } from "../controllers/walletController.js";

const router = express.Router();

// Get wallet balance for a user
router.get("/:username", getWalletBalance);

export default router;
