const express = require("express");
const router = express.Router();
const Location = require("../models/locationModel");
const { addLocations } = require("../controllers/locationController");
const parser = express.json();

router.get("/locations", async (req, res) => {
    try {
        const locations = await Location.find({});
        res.status(200).send({
            count: locations.length,
            data: locations
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

router.post("/locations", parser, async (req, res) => {
    const city = req.body.city;
    const country = req.body.country;
    const lat = req.body.lat;
    const lng = req.body.lng;

    try {
        const locations = await addLocations(city, country, lat, lng);
        res.status(201).send({
            message: "success",
            data: locations
        });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});


module.exports = router;