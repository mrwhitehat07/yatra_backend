const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const salt = process.env.SALT;
const { isEmpty } = require("validator");
const { validateEmail, verificationToken, passwordResetMail } = require("../controllers/globalController");

const updatePassword = async (uuid, curPassword, newPassword, cnfPassword) => {
    if(isEmpty(`${curPassword}`) || isEmpty(`${newPassword}`) || isEmpty(`${cnfPassword}`)){
        return "Something is missing";
    }
    else{
        const user = await User.findOne({ _id: uuid });
        const validated = await bcrypt.compare(curPassword, user.password);
        if (validated) {
            if (newPassword == cnfPassword){
                await User.updateOne(
                    { _id: uuid },
                    {
                        $set: {
                            password: await bcrypt.hash(`${newPassword}`, parseInt(salt))
                        }
                    }
                );
                return 'success';
            } 
            else {
                return "Password donot match";
            }
        } 
        else {
            return "Password donot match";
        };
    }
}

const forgotPassword = async (email) => {
    if(isEmpty(`${email}`)){
        return "Email field can't be empty";
    }
    else {
        if(!validateEmail(email)){
            return "please enter valid email";
        }
        else {
            const user = await User.findOne({ email: email })
            if (user == null){
                return "User with provided not exists";
            }
            else {
                const token = verificationToken(user._id);
                await passwordResetMail(email, token);
                return "Email sent to provided email";
            }
        }
    }
}

const resetPassword = async (uuid, newPassword, cnfPassword) => {
    if(isEmpty(`${newPassword}`) || isEmpty(`${cnfPassword}`)){
        return "Fields can't be empty";
    }
    else {
        if (newPassword == cnfPassword){
            await User.updateOne(
                { _id: uuid },
                {
                    $set: {
                        password: await bcrypt.hash(`${newPassword}`, parseInt(salt))
                    }
                }
            );
            return 'success';
        } 
        else {
            return "Password donot match";
        } 
        
    }
}

module.exports = {
    updatePassword,
    forgotPassword,
    resetPassword,
}