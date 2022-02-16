const express = require("express");
const { verifyToken } = require("../middlewares");
const Request = require("../models/tripRequestModel");
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
    const title = req.body.title;
    const description = req.body.description;
    const address = req.body.address;
    const visitDate = req.body.visitDate;
    try {
        const trip = await sendRequest(uid, title, description, address, visitDate);        
        res.status(201).send({ message: trip });
    } catch (error) {
        res.send(error);
    }  
});

router.put("/trip/:id", verifyToken, async (req, res) => {
    const tid = req.params.id;
    const location = req.body.address;
    const title = req.body.title;
    const description = req.body.description;
    const visitDate = req.body.visitDate;
    try {
        const trip = await acceptRequest(uid, tid, location, title, description, visitDate);        
        res.send({
            message: trip, 
        });
    } catch (error) {
        res.send(error);
    }
});

router.delete("/trip/:id", verifyToken, async (req, res) => {
    const id = req.params.id;
    try {
        const trip = await declineRequest(uid, id);
        res.status(204).send({
            message: trip
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

module.exports = router;