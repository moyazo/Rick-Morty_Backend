const db = require('../models/index.js');
const User = db.User;

const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email: email } });
};

module.exports = {getUserByEmail};