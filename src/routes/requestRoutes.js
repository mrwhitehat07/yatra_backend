const express = require("express");
const { verifyToken } = require("../middlewares");
const router = express.Router();
const { getRequest ,sendRequest, acceptRequest, declineRequest } = require("../controllers/requestController");

router.get("/requests", verifyToken, async (req, res) => {
    try {
       const requests = await getRequest(uid.email);
       res.status(200).send({
           count: requests.length,
           data: requests
        }); 
    } catch (error) {
       res.status(500).send(error);
    }
});

router.post("/trip/:id/requests", verifyToken, async (req, res) => {
    const trip = req.params.id;
    const email = req.body.email;
    const user = uid;
    try {
        const request = await sendRequest(email, trip, user.email);        
        res.status(201).send({ message: request });
    } catch (error) {
        res.send(error);
    }  
});

router.put("/requests/:id/accept", verifyToken, async (req, res) => {
    const id = req.params.id;
    const user = uid;
    const tri = req.body.trip;
    try {
        const trip = await acceptRequest(id, tri, user.email);        
        res.send({
            message: trip, 
        });
    } catch (error) {
        res.send(error);
    }
});

router.put("/requests/:id/decline", verifyToken, async (req, res) => {
    const id = req.params.id;
    const user = uid;
    try {
        const trip = await declineRequest(id, user.email);
        res.status(204).send({
            message: trip
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

module.exports = router;