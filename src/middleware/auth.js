const jsonwebtoken = require('jsonwebtoken');
const models = require('../models/index');


const TOKEN_SECRET = process.env.TOKEN_SECRET || '';


const ensureAuthentication = async (request, response, next) => {
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

    const payload = jsonwebtoken.decode(token);
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

module.exports = {ensureAuthentication};