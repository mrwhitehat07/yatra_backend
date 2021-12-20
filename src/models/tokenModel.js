const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: process.env.TOKEN,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: new Date( + new Date + (1 * 24 * 3600 * 1000) ),
    }
});

module.exports = mongoose.model("Token", tokenSchema);