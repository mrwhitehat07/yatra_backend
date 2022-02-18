const express = require("express");
const router = express.Router();
const { createUserProfile, updateUserProfile, deleteUserProfile, updateUserProfileImage } = require("../controllers/userController");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const { verifyToken } = require("../middlewares");
const upload = require("../config/multer.config");
const Logs = require("../models/logsModel");
const Trip = require("../models/tripModel");
const cloudinary = require("../config/cloudinary.config");

router.get('/profile', [verifyToken], async (req, res) => {
    try {
        const profiles = await Profile.findOne({ user: uid });
        if(profiles == null){
            res.status(200).send({
                message: "No Profile"
            });
        }
        else {
            res.send(profiles);
        }
    } catch (error) {
        res.send(error)
    }
});

router.get('/profile/detail', [verifyToken], async (req, res) => {
    try {
        const user_id = uid._id;
        const profiles = await Profile.findOne({ user: user_id });
        const user = await User.findOne({ _id: user_id });
        const image = [];
        const logCount = await Logs.find({ user: user_id });
        const plans = await Trip.find({ $or: [
            {
              host: user_id
            },
            {
              members: user_id
            }
          ]
        });

        const getImages = async () => {
            const logs = await Logs.find({ user: user_id });
            for(let i=0; i < logs.length; i++){
                image.push(logs[i].image);
            }
            return image;
        }

        const images = await getImages();

        res.status(200).send({
            profile: profiles,
            user: user,
            logImages: images,
            imageCount: image.length,
            logCount: logCount.length,
            planCount: plans.length,
        });
        
    } catch (error) {
        res.send(error)
    }
});

router.post('/profile', [verifyToken, upload.single('avtar')], async (req, res) => {
    const fullname = req.body.fullname;
    const bio = req.body.bio;
    const avtar = req.file.path;
    const address = req.body.address;
    try {
        const result = await cloudinary.uploader.upload(avtar);
        const profiles = await createUserProfile(uid, fullname, bio, result.secure_url, address, result.public_id);        
        res.status(201).send({
            message: profiles
        });
    } catch (error) {
        res.send(error);
    }  
});

router.put('/profile', verifyToken, async (req, res) => {
    const fullname = req.body.fullname;
    const bio = req.body.bio;
    const address = req.body.address;
    try {
        const profiles = await updateUserProfile(uid, fullname, bio, address);        
        res.status(200).send({
            message: profiles
        });
    } catch (error) {
        res.send(error);
    }  
});

router.put('/profile/image', [verifyToken, upload.single('avtar')], async (req, res) => {
    const avtar = req.file.path;
    try {
        const result = await cloudinary.uploader.upload(avtar);
        const profiles = await updateUserProfileImage(uid, result.secure_url, result.public_id);        
        res.status(200).send({
            message: profiles 
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