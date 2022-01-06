const mongoose = require("mongoose");
const ROLE = require("../config/role.config");

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: ROLE.BASIC,
        enum: ROLE,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifiedAt: {
        type: Date
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("auth", authSchema);