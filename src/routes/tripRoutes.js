const express = require("express");
const { verifyToken } = require("../middlewares");
const Trip = require("../models/tripModel");
const router = express.Router();
const { createTrips, updateTrips, deleteTrips } = require("../controllers/tripController");

router.get("/trip", verifyToken, async (req, res) => {
    try {
        
    } catch (error) {
       res.status(500).send(error);
    }
});

router.post("/trip", verifyToken, async (req, res) => {
    const location = req.body.location;
    const title = req.body.title;
    const description = req.body.description;
    const address = req.body.address;
    const visitDate = req.body.visitDate;
    try {
        const trip = await createTrips(uid, location, title, description, address, visitDate);        
        res.status(201).send({
            message: "trip created successfully", 
            data: trip
        });
    } catch (error) {
        res.send(error);
    }  
});

router.put("/add-members", verifyToken, async (req, res) => {

});

router.put("/trip/:slug", verifyToken, async (req, res) => {
    const location = req.body.location;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const visitDate = req.body.visitDate;
    try {
        const logs = await updateTrips(uid, location, title, description, image, visitDate);        
        res.send({
            message: "trip updated successfully", 
        });
    } catch (error) {
        res.send(error);
    }
});

router.delete("/trip/:slug", verifyToken, async (req, res) => {
    const slug = req.params.slug;
    try {
        const logs = await deleteTrips(slug);
        res.status(204).send({
            message: "trip cancelled", 
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

module.exports = router;