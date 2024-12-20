import mongoose from "mongoose";

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
    username: {
        type: String, // Username instead of ObjectId
        ref: "users", // Reference to User model
        required: true,
    },
    type: {
        type: String,
        enum: ["Buy", "Sell"], // Allow 'Buy' and 'Sell' as transaction types
        required: true,
    },
    numberOfCoins: {
        type: Number, // The number of coins involved in the transaction
        required: true,
    },
    coinCurrency: {
        type: String, // The currency of the coin (e.g., "BTC", "ETH")
        required: true,
    },
    date: {
        type: String, // Formatted date (DD/MM/YYYY, HH:MM:SS)
        required: true,
    },
});

// Export the transaction model
const transactionModel = mongoose.model("transactions", transactionSchema);
export default transactionModel;
