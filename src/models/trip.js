import mongoose from "mongoose";
import locationSchema from "./location";

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

const Trip = mongoose.model("trip", tripSchema);