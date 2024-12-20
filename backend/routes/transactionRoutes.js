import express from "express";
import {
    addTransaction,
    getTransactionsByUser,
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new transaction
router.post("/add", addTransaction);

// Get transactions by username
router.get("/:username", getTransactionsByUser);

export default router;

