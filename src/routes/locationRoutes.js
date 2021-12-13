const express = require("express");
const router = express.Router();
const Location = require("../models/locationModel");

router.get("/locations", async (req, res) => {
    try {
        const locations = Location.find({});
        res.send(locations);
    } catch (error) {
       res.status(500).send(error);
    }
});



module.exports = router;