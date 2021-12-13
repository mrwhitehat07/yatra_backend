const mongoose = require("mongoose");
const locationSchema = require("./location");

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    address: locationSchema,
    visitDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("trip", tripSchema);