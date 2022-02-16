const User = require("../models/userModel");
const Profile = require("../models/profileModel");

const createUserProfile = async (uuid, fullname, bio, avtar, address, avtar_id) => {
    const profile = Profile({
        user: uuid._id,
        fullname: fullname,
        bio: bio,
        avtar: avtar,
        address: address,
        avtar_id, avtar_id
    });
    await profile.save();
    return "created";
}

const updateUserProfile = async (uuid, fullname, bio, address) => {
    await Profile.updateOne(
        { user: uuid._id }, 
        { 
            $set: {
                fullname: (fullname != null) ? fullname : this.fullname,
                bio: (bio != null) ? bio : this.bio,
                address: (address != null) ? address : this.addreess
            }
        },
    );
    return "updated";
}

const updateUserProfileImage = async (uuid, avtar) => {
    await Profile.updateOne(
        { user: uuid._id }, 
        { 
            $set: {
                avtar: (avtar != null) ? avtar : this.avtar,
            }
        },
    );
}

const deleteUserProfile = async (uuid) => {
    await Profile.deleteOne({ user: uuid });
    return "deleted";
}

module.exports = {
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
    updateUserProfileImage,
}