const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    },
    members: [{
        type: String,
        ref: "auth"
    }],
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
        ref: "location"
    },
    visitDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("trip", tripSchema);