const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const parser = express.json();
const salt = process.env.SALT;
const secretKey = process.env.SECRET_KEY;
const transporter = require("../config/emailer.config");
const { verifyToken } = require("../middlewares");
const { createUserProfile } = require("../controllers/userController");

router.post('/register', parser, async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, parseInt(salt))
    });  
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            await newUser.save();
            await transporter.sendMail({
                to: req.body.email, 
                subject: "Verify account",
                html: "This is your code: "+7976
            })
            res.status(200).send({
                message: "email sent for verification, please check",
                data: newUser
            });
        } else {
            res.status(400).send({
                message: "Email already in use."
            });
        }        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", parser, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(400).send({
            message: "Not found!"
        });
    
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).send({
            message: "Wrong credentials!"
        });
        
        const access_token = await jwt.sign({uuid: user._id}, secretKey, {expiresIn: "12hr"});

        res.status(200).send({
            token: access_token, 
            message: "success", 
            isVerified: user.isVerified
        });
     
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/verify", parser, async (req, res) => {
    try{
       const code = req.body.pin;
       const user = await User.findOne({ email: req.body.email });
       if (user.isVerified == true) {
            res.status(200).send({
                message: "You are already a verified user."
            });
       } else {
            if (code === 7976){
                await User.updateOne({email: req.body.email}, { $set: { isVerified: true } });
                res.status(200).send({
                    message: "User Verified"
                });
            }
            else {
                res.status(401).send({
                    message: "Invalid pin"
                });
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/profile', [verifyToken], async (req, res) => {
    try {
        const profiles = await User.findOne({ _id: uid });
        res.send(profiles);
    } catch (error) {
        res.send(error)
    }
});

router.put('/profile', [parser, verifyToken], async (req, res) => {
    const fullname = req.body.fullname;
    const bio = req.body.bio;
    const avtar = req.body.avtar;
    const address = req.body.address;
    try {
        const profiles = await createUserProfile(uid, fullname, bio, avtar, address);        
        res.send({message: "success", data: profiles});
    } catch (error) {
        res.send(error);
    }  
});

module.exports = router;