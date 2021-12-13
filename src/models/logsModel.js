const mongoose = require("mongoose");

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

module.exports = mongoose.model("Logs", logsSchema);