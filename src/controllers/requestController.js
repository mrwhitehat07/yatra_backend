const TripRequest = require("../models/tripRequestModel");
const Trip = require("../models/tripModel");

const getRequest = async (email) => {
    const request = await TripRequest.find({ $and: [
        {user: email},
        {status: "none"}
    ] });
    return request;
}

const sendRequest = async (email, trip, uid) => {
    const req = await TripRequest.findOne({
        $and: [
            { user: email },
            { trip: trip }
        ]
    })
    if (req === null) {
        const request = TripRequest({ 
            user: email,
            trip: trip,
            sender: uid
        });
        await request.save();
        return "request sent";
    }
    else {
        return "request was sent already";
    }
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
                    isAccepted: true,
                    status: "accepted"
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
                    status: "declined",
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