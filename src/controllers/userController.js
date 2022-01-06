const User = require("../models/userModel");
const Profile = require("../models/profileModel");

const createUserProfile = async (uuid, fullname, bio, avtar, address) => {
    const user = await User.findOne({ _id: uuid });
    const profile = Profile({
        user: user._id,
        fullname: fullname,
        bio: bio,
        avtar: avtar,
        address: address
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
                avtar: (avtar != null) ? avtar : this.avtar,
                address: (address != null) ? address : this.addreess
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
}