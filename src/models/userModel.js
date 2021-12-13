const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    bio: {
        type: String
    },
    avtar: {
        type: String
    },
    address: {
        type: String,
    },
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
        type: [String],
        default: "basic"
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("auth", authSchema);