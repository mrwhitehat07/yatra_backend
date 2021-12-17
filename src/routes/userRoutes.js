const express = require("express");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const parser = express.json();
const salt = process.env.SALT;
const secretKey = process.env.SECRET_KEY;
const transporter = require("../config/emailer.config");
const { saveToken } = require("../controllers/tokenController");

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
                message: "email sent for verification, please check & verify",
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
        
        const access_token = jwt.sign({uuid: user._id}, secretKey, {expiresIn: "24hr"});
        
        await saveToken(user._id, access_token);

        res.status(200).send({
            token: access_token, 
            message: "success", 
            isVerified: user.isVerified
        });
     
    } catch (err) {
        console.log(err);
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


module.exports = router;