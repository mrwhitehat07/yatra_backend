const validator = require("validator")
const transporter = require("../config/emailer.config");
const jwt = require("jsonwebtoken");
const { saveToken } = require("../controllers/tokenController");

const validateEmail = (email) => {
    const isEmail = validator.isEmail(email);
    return isEmail;
}

const verificationToken = (uuid) => {
    const verificationToken = jwt.sign({uuid: uuid}, process.env.VERIFICATION_KEY, { expiresIn: process.env.TOKEN_EXPIRE })
    saveToken(uuid, verificationToken, process.env.VERIFICATION);
    return verificationToken;
}

const sendMail = async (email, token) => {
    const url = "http://localhost:8000/api/verify/"+token;
    await transporter.sendMail({
        to: email, 
        subject: "Please Verify Account",
        html: "<h1>Click on the below to verify</h1> <br> <a href='"+url+"'>here</a>"
    });
}

const passwordResetMail = async (email, token) => {
    const url = "http://localhost:8000/api/reset-password/"+token;
    await transporter.sendMail({
        to: email, 
        subject: "Reset password",
        html: "<h1>Click on the below to reset password</h1> <br> <a href='"+url+"'>here</a>"
    });
}

module.exports = {
    validateEmail,
    sendMail,
    verificationToken,
    passwordResetMail,
}