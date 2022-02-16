const Logs = require("../models/logsModel");
const User = require("../models/userModel");

const createLogs = async (uuid, location, title, description, image, visitDate) => {
    const logs = Logs({
        slug: uuid._id + title.toLowerCase() + location,
        location: location,
        user: uuid._id,
        title: title,
        description: description,
        image: image,
        visitDate: visitDate
    });
    await logs.save();
    return "created";
}

const updateLogs = async (uuid, slug, location, title, description, visitDate) => {
    await Logs.updateOne(
        {  $and: [{ slug: slug }, { user: uuid }] },
        { 
            $set: {
                location: (location != null) ? location : this.location,
                title: (title != null) ? title : this.title,
                description: (description != null) ? description : this.description,
                visitDate: (visitDate != null) ? visitDate : this.visitDate
            }
        }
    );
    return "updated";
}

const updateLogsImage = async (uuid, slug, image) => {
    await Logs.updateOne(
        {  $and: [{ user: uuid._id }, { slug: slug }] },
        { 
            $set: {
                image: (image != null) ? image : this.image,
            }
        }
    );
    return "updated";
}

const deleteLogs = async (slug, uuid) => {
    await Logs.deleteOne({ $and: [{slug: slug}, {user: uuid._id}] });
    return "deleted";
}

module.exports = {
    createLogs,
    updateLogs,
    deleteLogs,
    updateLogsImage,
}