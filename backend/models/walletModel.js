import mongoose from "mongoose";

// Define the wallet schema
const walletSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    numberOfCoins: {
        type: Number,
        required: true,
        default: 0,
    },
    coinCurrency: {
        type: String, // Currency like BTC, ETH, etc.
        required: true,
    },
});

// Export the wallet model
const walletModel = mongoose.model("wallets", walletSchema);
export default walletModel;
