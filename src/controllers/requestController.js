const TripRequest = require("../models/tripRequestModel");
const Trip = require("../models/tripModel");

const getRequest = async (email) => {
    const user = await TripRequest.find({ user: email });
    return user;
}

const sendRequest = async (uuid, location, title, description, visitDate) => {
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

const acceptRequest = async (uuid, image) => {
    await Logs.updateOne(
        {  user: uuid },
        { 
            $set: {
                image: (image != null) ? image : this.image,
            }
        }
    );
}

const declineRequest = async (slug) => {
    await Logs.deleteOne({ slug: slug });
}

module.exports = {
    getRequest,
    sendRequest,
    acceptRequest,
    declineRequest,
}