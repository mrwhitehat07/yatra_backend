const express = require("express");
const router = express.Router();
const { createUserProfile, updateUserProfile, deleteUserProfile } = require("../controllers/userController");
const Profile = require("../models/profileModel");
const { verifyToken } = require("../middlewares");
const parser = express.json();
const upload = require("../config/multer.config");

router.get('/profile', [verifyToken], async (req, res) => {
    try {
        const profiles = await Profile.findOne({ user: uid });
        if(profiles == null){
            res.status(404).send({
                message: "Profile doesnot exists please create one"
            });
        }
        else {
            res.send(profiles);
        }
    } catch (error) {
        res.send(error)
    }
});

router.post('/profile', [parser, verifyToken, upload.single('avtar')], async (req, res) => {
    const fullname = req.body.fullname;
    const bio = req.body.bio;
    const avtar = req.body.avtar;
    const address = req.body.address;
    try {
        const profiles = await createUserProfile(uid, fullname, bio, avtar, address);        
        res.send({
            message: "profile created successfully", 
            data: profiles
        });
    } catch (error) {
        res.send(error);
    }  
});

router.put('/profile', [parser, verifyToken,  upload.single('avtar')], async (req, res) => {
    const fullname = req.body.fullname;
    const bio = req.body.bio;
    const avtar = req.body.avtar;
    const address = req.body.address;
    try {
        const profiles = await updateUserProfile(uid, fullname, bio, avtar, address);        
        res.status(201).send({
            message: "profile updated successfully", 
            data: profiles
        });
    } catch (error) {
        res.send(error);
    }  
});

router.delete("/profile", [verifyToken], async (req, res) => {
    try {
        await deleteUserProfile(uid);
        res.status(204).send({
            message: "Profile deleted successfully",
            
        });
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;