const express = require("express");
const { verifyToken } = require("../middlewares");
const Logs = require("../models/logsModel");
const router = express.Router();
const parser = express.json();
const { createLogs, updateLogs, deleteLogs } = require("../controllers/logsController");

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

// get specific log
router.get("/logs/:slug", async (req, res) => {
    const slug = req.params.slug;
    try {
        const logs = await Logs.findOne({ slug: slug });
        res.status(200).send(logs);
    } catch (error) {
       res.status(500).send(error);
    }
});

// post log
router.post("/logs", [parser, verifyToken], async (req, res) => {
    const location = req.body.location;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const visitDate = req.body.visitDate;
    try {
        const logs = await createLogs(uid, location, title, description, image, visitDate);        
        res.status(201).send({
            message: "logs created successfully", 
            data: logs
        });
    } catch (error) {
        res.send(error);
    }  
});

// update log
router.put("/logs/:slug", [parser, verifyToken], async (req, res) => {
    const location = req.body.location;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const visitDate = req.body.visitDate;
    try {
        const logs = await updateLogs(uid, location, title, description, image, visitDate);        
        res.send({
            message: "logs created successfully", 
            data: logs
        });
    } catch (error) {
        res.send(error);
    }
});

// delete log
router.delete("/logs/:slug", [parser, verifyToken], async (req, res) => {
    const slug = req.params.slug;
    try {
        const logs = await deleteLogs(slug);
        res.status(204).send({
            message: "logs deleted successfully", 
            data: logs
        });
    } catch (error) {
       res.status(500).send(error);
    }
});

module.exports = router;