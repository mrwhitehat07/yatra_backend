const Token = require("../models/tokenModel");

const saveToken = async (uid, token) => {
    const userToken = Token({ user: uid, token: token });
    await userToken.save();
}

module.exports = {
    saveToken
}