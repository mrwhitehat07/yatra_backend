const express = require("express");
const { verifyToken } = require("../middlewares");
const router = express.Router();
const { getRequest ,sendRequest, acceptRequest, declineRequest } = require("../controllers/requestController");

router.get("/requests", verifyToken, async (req, res) => {
    try {
       const requests = await getRequest(uid.email);
       res.send({
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
        const request = await sendRequest(email, request, user.email);        
        if(request == "request sent"){
            res.status(201).send({ message: trip });
        }
        else {
            res.status(500).send("Error occurred");
        }

    } catch (error) {
        res.send(error);
    }  
});

router.put("/requests/:id", verifyToken, async (req, res) => {
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

router.put("/requests/:id", verifyToken, async (req, res) => {
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