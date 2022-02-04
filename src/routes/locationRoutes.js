const express = require("express");
const router = express.Router();
const Location = require("../models/locationModel");
const { addLocations, updateLocations, deleteLocations } = require("../controllers/locationController");
const upload = require("../config/multer.config");
const cloudinary = require("../config/cloudinary.config");

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

router.get("/locations/popular", async (req, res) => {
    try {
        const locations = await Location.find({}).limit(4);
        res.status(200).send({
            count: locations.length,
            data: locations
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

router.get("/locations/:slug", async (req, res) => {
    try {
        const locations = await Location.findOne({ slug: req.params.slug });
        if(locations == null){
            res.status(404).send({message: "No location found"});
        }
        else{
            res.status(200).send(locations);
        }
    } catch (error) {
       res.status(500).send(error);
    }
});

router.post("/locations", upload.single('image'), async (req, res) => {
    const city = req.body.city;
    const country = req.body.country;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const ratings = req.body.ratings;
    const image = req.file.path;
    try {
        const result = await cloudinary.uploader.upload(image);
        const locations = await addLocations(city, country, lat, lng, ratings, result.secure_url, result.public_id);
        res.status(201).send({
            message: "success",
            data: locations
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put("/locations/:slug", upload.single("image"), async (req, res) => {
    const city = req.body.city;
    const country = req.body.country;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const ratings = req.body.ratings;
    const slug = req.params.slug;
    const image = req.file.path;

    try {
        const result = await cloudinary.uploader.upload(image);
        const locations = await updateLocations(slug, city, country, lat, lng, ratings, result.secure_url);
        res.status(201).send({
            message: "location updated successfully",
            data: locations
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/locations/:slug", async (req, res) => {
    const slug = req.params.slug;
    try {
        await deleteLocations(slug);
        res.status(204).send({
            message: "location deleted successfully",
        });
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;