const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const salt = process.env.SALT;
const secretKey = process.env.SECRET_KEY;
const { saveToken } = require("../controllers/tokenController");
const { validateEmail, verificationToken, sendMail } = require("../controllers/globalController");
const { verifyUser, verifyToken } = require("../middlewares");
const { updatePassword, resetPassword, forgotPassword } = require("../controllers/passwordController");

router.post('/register', async (req, res) => {
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
                res.status(201).send({
                    message: "registered successfully",
                    data: newuser
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

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if(validateEmail(email) == true){
            const user = await User.findOne({ email: email });
            !user && res.status(404).send({
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
       const user = await User.findOne({ _id: uid._id });
       if (user.isVerified == true) {
            res.status(200).send({
                message: "You are already a verified user."
            });
       } else {
            await User.updateOne(
                {_id: user._id}, 
                { 
                    $set: { 
                        isVerified: true,
                        verifiedAt: Date.now()
                    } 
                });
            res.status(200).send({
                message: "User Verified"
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/change-password', [verifyToken], async (req, res) => {
    const curPassword = req.body.curPassword;
    const newPassword = req.body.newPassword;
    const cnfPassword = req.body.cnfPassword;
    try {
        const status = await updatePassword(uid, curPassword, newPassword, cnfPassword);
        res.send({ message: status });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

router.post('/forgot-password', async (req, res) => {
    const email = req.body.email;
    try {
        const status = await forgotPassword(email);
        res.send({ message: status });
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.newPassword;
    const cnfPassword = req.body.cnfPassword;
    const userData = jwt.verify(token, process.env.VERIFICATION_KEY);
    uid = await User.findOne({ _id: userData.uuid })
    try {
        const status = await resetPassword(uid._id, newPassword, cnfPassword);
        res.send({ message: status });
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/verify-email', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: uid._id });
        const token = verificationToken(user._id);
        await sendMail(user.email, token);
        res.status(200).send({
            message: "email sent for verification, please check & verify",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

module.exports = router;