const express = require("express");
const { verifyToken } = require("../middlewares");
const Trip = require("../models/tripModel");
const router = express.Router();
const { getTrips, createTrips, updateTrips, deleteTrips } = require("../controllers/tripController");

router.get("/trip", verifyToken, async (req, res) => {
    try {
       const trips = await getTrips(uid);
       res.send({
           count: trips.length,
           data: trips
        }); 
    } catch (error) {
       res.status(500).send(error);
    }
});

router.get("/trip/:id", verifyToken, async (req, res) => {
    const id = req.params.id;
    try {
       const trip = await Trip.findOne({ _id: id });
       res.send(trip); 
    } catch (error) {
       res.status(500).send(error);
    }
});

router.post("/trip", verifyToken, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const address = req.body.address;
    const visitDate = req.body.visitDate;
    try {
        const trip = await createTrips(uid, title, description, address, visitDate);        
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
        const trip = await updateTrips(uid, tid, location, title, description, visitDate);        
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
        const trip = await deleteTrips(uid, id);
        res.status(204).send({
            message: trip
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

module.exports = router;