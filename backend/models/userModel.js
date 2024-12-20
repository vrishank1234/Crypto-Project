import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        username: {
            type: String,
            required: true,
            unique: [true, "Username already exists"],
            min: [4, "Username too short"],
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "male", "female"],
        },
        profilePic: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/3607/3607444.png",
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
