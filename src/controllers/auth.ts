import models from '../models';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import getUserByEmail  from './users';

export type signUpTypes = {
    email: string,
    password: string,
    userName: string
}
export type signInTypes = {
    email: string,
    password: string,
}

const TOKEN_SECRET = process.env.TOKEN_SECRET || '';
const User = models.User;
const saltRounds = 10;

const signup = async (signData: signUpTypes) => {
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

const login = async (signData: signInTypes) => {
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

export default {signup,login} ;