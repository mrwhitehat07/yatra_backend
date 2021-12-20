const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const parser = express.json();
const salt = process.env.SALT;
const secretKey = process.env.SECRET_KEY;
const { saveToken } = require("../controllers/tokenController");
const { validateEmail, verificationToken, sendMail } = require("../controllers/globalController");
const { verifyUser } = require("../middlewares");

router.post('/register', parser, async (req, res) => {
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, parseInt(salt));
    const newUser = new User({
        email: email,
        password: password
    });  
    try {
        if(validateEmail(email) == true){
            const user = await User.findOne({email: email});
            if(!user) {
                const newuser = await newUser.save();
                const token = verificationToken(newuser._id);
                await sendMail(newuser.email, token);
                res.status(200).send({
                    message: "email sent for verification, please check & verify",
                    data: newUser
                });
            }else{
                res.status(403).send({
                    message: "Email already in use.",
                });
            }
        } else {
            res.status(403).send({
                message: "Please enter valid email"
            });
        }        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", parser, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if(validateEmail(email) == true){
            const user = await User.findOne({ email: email });
            !user && res.status(400).send({
                message: "Not found!"
            });
        
            const validated = await bcrypt.compare(password, user.password);
            !validated && res.status(400).send({
                message: "Wrong credentials!"
            });
            
            const access_token = jwt.sign({uuid: user._id}, secretKey, {expiresIn: process.env.TOKEN_EXPIRE});
            
            await saveToken(user._id, access_token);

            res.status(200).send({
                token: access_token, 
                message: "success", 
            });
        } else {
            res.status(403).send({
                message: "Please enter valid email"
            });
        }  
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/verify/:token", [verifyUser], async (req, res) => {
    try{
       const user = await User.findOne({ _id: uid });
       if (user.isVerified == true) {
            res.status(200).send({
                message: "You are already a verified user."
            });
       } else {
            await User.updateOne({_id: user._id}, { $set: { isVerified: true } });
            res.status(200).send({
                message: "User Verified"
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router;