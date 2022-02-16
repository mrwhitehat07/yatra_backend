const Trip = require("../models/tripModel");
const { isEmpty } = require("validator");

const getTrips = async (uuid, email) => {
    const trip = Trip.find({ $or: [{host: uuid}, {members: email}] });
    return trip;
}

const createTrips = async (uuid, title, description, address, visitDate) => {
    if(isEmpty(`${title}`)){
        return "Title can't be empty";
    }
    else {
        const trip = Trip({
            host: uuid,
            title: title,
            description: description,
            address: address,
            visitDate: visitDate,
        });
        await trip.save();
        return "Trip created successfully";
    }
}

const updateTrips = async (uuid, tid, address, title, description, visitDate) => {
    await Trip.updateOne(
        { $and: [{_id: tid}, {host: uuid._id}] },
        { 
            $set: {
                address: (address != null) ? address : this.address,
                title: (title != null) ? title : this.title,
                description: (description != null) ? description : this.description,
                visitDate: (visitDate != null) ? visitDate : this.visitDate
            }
        }
    );
    return "Trips plans updated successfully";
}

const deleteTrips = async (uuid, tid) => {
    await Trip.deleteOne({ $and: [ {_id: tid}, {host: uuid._id} ]});
    return "Trips cancelled successfully";
     
}

module.exports = {
    getTrips,
    createTrips,
    updateTrips, 
    deleteTrips,
}