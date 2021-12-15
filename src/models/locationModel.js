const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("location", locationSchema);