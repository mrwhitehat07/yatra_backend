const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
    location: {
        type: String,
        ref: "location"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    },
    slug: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String,
    },
    image: {
        type: String,
    },
    ratings: {
        type: Number
    },
    visitDate: {
        required: true,
        type: Date,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Logs", logsSchema);