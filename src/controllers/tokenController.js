const Token = require("../models/tokenModel");

const saveToken = async (uid, token, type) => {
    const userToken = Token({ user: uid, token: token, type: type });
    await userToken.save();
}

module.exports = {
    saveToken
}