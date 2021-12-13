const User = require("../models/userModel");

const createUserProfile = async (uuid, fullname, bio, avtar, address) => {
    const user = await User.findOne({ _id: uuid });
    await User.updateOne(
        { _id: uuid }, 
        { 
            $set: {
                fullname: (fullname != null) ? fullname : user.fullname,
                bio: (bio != null) ? bio : user.bio,
                avtar: (avtar != null) ? avtar : user.avtar,
                address: (address != null) ? address : user.addreess
            }
        },
        { upsert: true }
    );
}

module.exports = {
    createUserProfile,
}