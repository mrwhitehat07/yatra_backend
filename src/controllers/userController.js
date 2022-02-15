const User = require("../models/userModel");
const Profile = require("../models/profileModel");

const createUserProfile = async (uuid, fullname, bio, avtar, address, avtar_id) => {
    const user = await User.findOne({ _id: uuid });
    const profile = Profile({
        user: user._id,
        fullname: fullname,
        bio: bio,
        avtar: avtar,
        address: address,
        avtar_id, avtar_id
    });
    await profile.save();
}

const updateUserProfile = async (uuid, fullname, bio, avtar, address) => {
    await Profile.updateOne(
        { user: uuid }, 
        { 
            $set: {
                fullname: (fullname != null) ? fullname : this.fullname,
                bio: (bio != null) ? bio : this.bio,
                address: (address != null) ? address : this.addreess
            }
        },
    );
}

const updateUserProfileImage = async (uuid, avtar) => {
    await Profile.updateOne(
        { user: uuid }, 
        { 
            $set: {
                avtar: (avtar != null) ? avtar : this.avtar,
            }
        },
    );
}

const deleteUserProfile = async (uuid) => {
    await Profile.deleteOne({ user: uuid });
}

module.exports = {
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
    updateUserProfileImage,
}