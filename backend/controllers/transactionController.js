import transactionModel from "../models/transactionModel.js";
import walletModel from "../models/walletModel.js"; // Import wallet model
import userModel from "../models/userModel.js";

// @desc    Add a transaction
export const addTransaction = async (req, res) => {
    try {
        const { username, type, numberOfCoins, coinCurrency, date } = req.body;
        console.log(username, type, numberOfCoins, coinCurrency, date);

        // Validate input
        if (!username || !type || !numberOfCoins || !coinCurrency) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Verify that the user exists
        const userExists = await userModel.findOne({ username });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new transaction
        const newTransaction = new transactionModel({
            username,
            type,
            numberOfCoins,
            coinCurrency,
            date,
        });

        // Save to MongoDB
        await newTransaction.save();

        // Handle the wallet balance update based on the transaction type
        let wallet = await walletModel.findOne({ username, coinCurrency });

        if (wallet) {
            // Update existing wallet entry
            if (type === "Buy") {
                wallet.numberOfCoins += numberOfCoins; // Increment for Buy
            } else if (type === "Sell") {
                wallet.numberOfCoins -= numberOfCoins; // Decrement for Sell
            }
            await wallet.save();
        } else {
            // If wallet doesn't exist, create a new one
            if (type === "Buy") {
                wallet = new walletModel({
                    username,
                    numberOfCoins,
                    coinCurrency,
                });
            } else if (type === "Sell") {
                // Ensure the user cannot sell more coins than they have
                return res.status(400).json({ message: "Insufficient balance to sell" });
            }
            await wallet.save();
        }

        res.status(201).json({
            message: "Transaction added and wallet updated successfully",
            transaction: newTransaction,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// @desc    Get transactions by username
export const getTransactionsByUser = async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // Check if the user exists
        const userExists = await userModel.findOne({ username });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch transactions
        const transactions = await transactionModel.find({ username });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
