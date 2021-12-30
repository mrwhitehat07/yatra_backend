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
    image: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("location", locationSchema);