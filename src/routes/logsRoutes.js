const express = require("express");
const { verifyToken } = require("../middlewares");
const Logs = require("../models/logsModel");
const router = express.Router();
const { createLogs, updateLogs, deleteLogs, updateLogsImage } = require("../controllers/logsController");
const upload = require("../config/multer.config");
const cloudinary = require("../config/cloudinary.config");
const Location = require("../models/locationModel");
const Profile = require("../models/profileModel");

// get all logs
router.get("/logs", async (req, res) => {
    try {
        const logs = await Logs.find({});
        res.status(200).send({
            count: logs.length,
            data: logs
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

router.get("/logs/popular", async (req, res) => {
    try {
        const logs = await Logs.find({}).limit(4);
        res.status(200).send({
            count: logs.length,
            data: logs
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

router.get("/logs/me", verifyToken, async (req, res) => {
    try {
        const logs = await Logs.find({ user: uid._id });
        res.status(200).send(logs);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

// get specific log
router.get("/logs/:slug", async (req, res) => {
    const slug = req.params.slug;
    try {
        const logs = await Logs.findOne({ slug: slug });
        const location = await Location.findOne({ slug: logs.location });
        const profile = await Profile.findOne({ user: logs.user })
        res.status(200).send({ 
            logs: logs,
            location: location,
            user: profile,
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

// post log
router.post("/logs", [verifyToken, upload.single('image')], async (req, res) => {
    const location = req.body.location;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.path;
    const visitDate = req.body.visitDate;
    try {
        const result = await cloudinary.uploader.upload(image);
        const logs = await createLogs(uid, location, title, description, result.secure_url, visitDate);        
        res.status(201).send({
            message: "logs created successfully", 
            data: logs
        });
    } catch (error) {
        res.send(error);
    }  
});

// update log
router.put("/logs/:slug", [verifyToken], async (req, res) => {
    const location = req.body.location;
    const title = req.body.title;
    const description = req.body.description;
    const visitDate = req.body.visitDate;
    const slug = req.params.slug;
    try {
        const logs = await updateLogs(uid, slug, location, title, description, visitDate);        
        res.send({
            message: "logs created successfully", 
            data: logs
        });
    } catch (error) {
        res.send(error);
    }
});

router.put("/logs/:slug/image", [verifyToken, upload.single('image')], async (req, res) => {
    const image = req.file.path;
    const slug = req.params.slug;
    try {
        const logs = await updateLogsImage(uid, slug, image);        
        res.send({
            message: "logs created successfully", 
            data: logs
        });
    } catch (error) {
        res.send(error);
    }
});

// delete log
router.delete("/logs/:slug", [verifyToken], async (req, res) => {
    const slug = req.params.slug;
    try {
        const logs = await deleteLogs(slug, uid);
        res.status(204).send({
            message: "logs deleted successfully", 
            data: logs
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

module.exports = router;