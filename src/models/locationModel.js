const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    coordinates: {
        type: [Number],
        required: false,
    },
    ratings: {
        type: Number
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("location", locationSchema);