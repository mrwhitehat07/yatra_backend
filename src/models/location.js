import mongoose from "mongoose";

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
    }
}, {
    timestamps: true,
});

const Location = mongoose.model("location", locationSchema);