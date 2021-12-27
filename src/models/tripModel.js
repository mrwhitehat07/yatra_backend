const mongoose = require("mongoose");
const locationSchema = require("./location");

const tripSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    }],
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