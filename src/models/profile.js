import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    bio: {
        type: String
    },
    avtar: {
        type: String
    },
    address: {
        type: String,
    }
}, {
    timestamps: true,
});

const Profile = mongoose.model("profile", profileSchema);