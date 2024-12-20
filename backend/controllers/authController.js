import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, username, password, gender, profilePic } = req.body;

        // Check if all required fields are provided
        if (!name || !username || !password || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the username already exists
        const userExists = await userModel.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name,
            username,
            password: hashedPassword,
            gender,
            profilePic,
        });

        // Save the user to the database
        await newUser.save();

        // Return a success message
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find the user by username
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        // Return the token
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get user by username
// @route   GET /auth/user/:username
// @access  Public
export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        // Validate if username is provided
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // Fetch user from the database based on username
        const user = await userModel.findOne({ username });

        // If user not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user data excluding the password
        const { password, ...userData } = user._doc;

        res.status(200).json(userData); // Send user data back to the frontend
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Protected route (example)
// @route   GET /auth/protected
// @access  Private
export const protectedRoute = async (req, res) => {
    try {
        res.status(200).json({ message: "This is a protected route" });
    } catch (error) {
        console.error("Error in protected route:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
