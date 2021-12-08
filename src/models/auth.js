import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Auth = mongoose.model("auth", authSchema);