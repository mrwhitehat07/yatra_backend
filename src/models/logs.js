import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String,
    },
    image: {
        type: String
    },
    visitDate: {
        required: true,
        type: Date,
    }
}, {
    timestamps: true,
});

const Logs = mongoose.model("Logs", logsSchema);