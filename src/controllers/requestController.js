const TripRequest = require("../models/tripRequestModel");
const Trip = require("../models/tripModel");

const getRequest = async (email) => {
    const user = await TripRequest.find({ user: email });
    return user;
}

const sendRequest = async (email, trip, uid) => {
    const request = TripRequest({ 
        user: email,
        trip: trip,
        sender: uid
    });
    await request.save();
    return "request sent";
}

const acceptRequest = async (rid, tid, email) => {
    try {
        await TripRequest.updateOne(
            { $and: [
                    {_id: rid}, {user: email}
                ]
            },
            {
                $set: {
                    isAccepted: true
                }
            }
        );
        await Trip.updateOne(
            { _id: tid },
            {
                $push: {
                    members: [email]
                }
            }
        )
        return "accepted";
    }
    catch (e) {
        return "cant accept";
    }
}

const declineRequest = async (rid, email) => {
    try {
        await TripRequest.updateOne(
            { $and: [
                    {_id: rid}, {user: email}
                ]
            },
            {
                $set: {
                    isAccepted: false
                }
            }
        );
        return "declined";
    }
    catch (e) {
        return "cant declined";
    }
}

module.exports = {
    getRequest,
    sendRequest,
    acceptRequest,
    declineRequest,
}