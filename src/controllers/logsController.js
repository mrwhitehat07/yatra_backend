const Logs = require("../models/logsModel");
const User = require("../models/userModel");

const createLogs = async (uuid, location, title, description, image, visitDate) => {
    const user = await User.findOne({ _id: uuid });
    const logs = Logs({
        slug: user._id + title.toLowerCase() + location,
        location: location,
        user: user._id,
        title: title,
        description: description,
        image: image,
        visitDate: visitDate
    });
    await logs.save();
}

const updateLogs = async (uuid, location, title, description, visitDate) => {
    await Logs.updateOne(
        {  user: uuid },
        { 
            $set: {
                location: (location != null) ? location : this.location,
                title: (title != null) ? title : this.title,
                description: (description != null) ? description : this.description,
                visitDate: (visitDate != null) ? visitDate : this.visitDate
            }
        }
    );
}

const updateLogsImage = async (uuid, image) => {
    await Logs.updateOne(
        {  user: uuid },
        { 
            $set: {
                image: (image != null) ? image : this.image,
            }
        }
    );
}

const deleteLogs = async (slug) => {
    await Logs.deleteOne({ slug: slug });
}

module.exports = {
    createLogs,
    updateLogs,
    deleteLogs,
    updateLogsImage,
}