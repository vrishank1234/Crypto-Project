import transactionModel from "../models/transactionModel.js";
import walletModel from "../models/walletModel.js"; // Import wallet model

// @desc    Get the wallet balance for a user
export const getWalletBalance = async (req, res) => {
    try {
        const { username } = req.params;

        // Validate input
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // Fetch all transactions for the given username
        const transactions = await transactionModel.find({ username });

        // Initialize an empty object to track coin balances
        const balance = {};

        // Iterate through each transaction and update the balance
        transactions.forEach((transaction) => {
            const { type, numberOfCoins, coinCurrency } = transaction;

            // If the coinCurrency is not yet in the balance object, initialize it
            if (!balance[coinCurrency]) {
                balance[coinCurrency] = 0;
            }

            // Update balance based on the transaction type (Buy or Sell)
            if (type === "Buy") {
                balance[coinCurrency] += numberOfCoins; // Increment for Buy
            } else if (type === "Sell") {
                balance[coinCurrency] -= numberOfCoins; // Decrement for Sell
            }
        });

        // Format the balance data into an array of objects
        const wallet = Object.keys(balance).map((currency) => ({
            username,
            numberOfCoins: balance[currency],
            coinCurrency: currency,
        }));

        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
