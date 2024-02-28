const models = require('../models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const {getUserByEmail} = require('./users');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'asfagwe234534gs';
const User = models.User;
const saltRounds = 10;

const signup = async (signData) => {
    const existedUser = await getUserByEmail(signData.email);

    if (existedUser) {
        throw new Error('User existed');
    }
    const email = signData.email;
    const userName = signData.userName
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(signData.password, salt);
    const user = await User.create({
        email,
        password: hashedPassword,
        userName,
        salt,
    });

    return jsonwebtoken.sign({ email: user.email }, TOKEN_SECRET);
};

const login = async (signData) => {
    const user = await getUserByEmail(signData.email);

    if (!user) {
        throw new Error('User not found');
    }

    const match = await bcrypt.compare(signData.password, user.password);

    if (!match) {
        throw new Error('Wrong password');
    }

    return jsonwebtoken.sign({ email: user.email }, TOKEN_SECRET);
};

module.exports = { signup, login };
