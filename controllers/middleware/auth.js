const jwt = require('jsonwebtoken');
const models = require('../../models');
const config = require('../../config/config');
const endpoints = {
    'POST /users/login': ['anonymus'],
    'GET /docs': ['anonymus'],
    'POST /users': ['admin'],
    'GET /users': ['admin'],
    'GET /decks': ['admin', 'contributor', 'student'],
    'GET /cards': ['admin', 'contributor', 'student'],
    'GET /groups': ['admin'],
    'GET /results': ['admin'],
    'GET /users/{id}': ['admin']
}

module.exports = (req, res, next) => {
    const endpoint = `${req.method} ${req.swagger.pathName}`;
    if (!req.headers.authorization && endpoints[endpoint].includes('anonymus')) {
        return next();
    }

    if (!req.headers.authorization) {
        res.status(403).send('Unauthorized');
    }

    const token = req.headers.authorization;
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const userId = decoded.id;
    models.User.findById(userId)
        .then(user => {
            req.user = user;
            if (endpoints[endpoint].includes(user.role)) {
                next();
            } else {
                res.status(403).send('Unauthorized');
            }
        });
} 
