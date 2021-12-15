const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    },
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
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("profile", profileSchema);