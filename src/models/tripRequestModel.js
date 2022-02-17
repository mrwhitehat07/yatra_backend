const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    sender: {
        type: String,
        ref: 'auth'
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "trip"
    },
    user: {
        type: String,
        ref: "auth"
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "none"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("request", requestSchema);