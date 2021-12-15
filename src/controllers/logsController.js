const Logs = require("../models/logsModel");
const User = require("../models/userModel");

const createLogs = async (uuid, location, title, description, image, visitDate) => {
    const user = await User.findOne({ _id: uuid });
    const logs = Logs({
        location: location,
        user: user._id,
        title: title,
        description: description,
        image: image,
        visitDate: visitDate
    });
    await logs.save();
}

const updateLogs = async () => {
    
}

const deleteLogs = async () => {
    
}

module.exports = {
    createLogs,
    updateLogs,
    deleteLogs
}