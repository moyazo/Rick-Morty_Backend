import jsonwebtoken from 'jsonwebtoken';
import models from '../models/index';
import {Request, Response, NextFunction} from 'express';

const TOKEN_SECRET = process.env.TOKEN_SECRET || '';
type TokenPayload = {
    email: string
}

const ensureAuthentication = async (request: Request & {user: { id:string , email: string } }, response: Response, next: NextFunction) => {
    if (request.path.includes('/auth')) {
        return next();
    }

    if (!request.headers.authorization) {
        return response.status(403).json('You are not authenticated');
    }

    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
        return response.status(403).json('Invalid token');
    }

    const payload = jsonwebtoken.decode(token) as TokenPayload;
    if (!payload || !payload.email) {
        return response.status(403).json('Invalid token');
    }

    const user = await models.User.findOne({ where: { email: payload.email } });

    if (!user) {
        return response.status(403).json('Wrong token');
    }

    request.user = { id: user.id, email: user.email };

    next();
};

export default ensureAuthentication;