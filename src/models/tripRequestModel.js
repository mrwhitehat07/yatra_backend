const mongoose = require("mongoose");
const Status = require("../config/trip.config");

const requestSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("request", requestSchema);