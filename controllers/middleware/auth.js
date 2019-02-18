const jwt = require('jsonwebtoken');
const models = require('../../models');
const config = require('../../config/config');
const endpoints = {
    'POST /users/login': ['anonymus'],
    'POST /users': ['admin'],
    'GET /users': ['admin', 'anonymus'],
    'GET /decks': ['admin', 'contributor', 'student'],
    'GET /cards': ['admin', 'contributor', 'student'],
    'GET /groups': ['admin', 'contributor'],
    //'GET /results': ['admin', 'contributor'],
    'GET /users/{id}': ['admin'],
    'PUT /users/{id}': ['admin'],
    'DELETE /users/{id}': ['admin'],
    //'GET /users/{userId}/results': ['admin'],
    'POST /cards': ['admin', 'contributor'],
    'GET /cards/{id}': ['admin', 'contributor', 'student'],
    'PUT /cards/{id}': ['admin', 'contributor'],
    'DELETE /cards/{id}': ['admin', 'contributor'],
    //'GET /cards/{cardId}/results': ['admin', 'contributor'],
    'GET /groups': ['admin', 'contributor'],
    'POST /groups': ['admin'],
    'GET /groups/{id}': ['admin', 'contributor'],
    'PUT /groups/{id}': ['admin'],
    'DELETE /groups/{id}': ['admin'],
    'GET /groups/{groupId}/users': ['admin', 'contributor'],
    'POST /decks': ['admin', 'contributor'],
    'GET /decks/{id}': ['admin', 'contributor', 'student'],
    'PUT /decks/{id}': ['admin', 'contributor'],
    'DELETE /decks/{id}': ['admin', 'contributor'],
    'GET /decks/{deckId}/cards': ['admin', 'contributor', 'student'],
    'GET /decks/{deckId}/groups': ['admin', 'contributor'],
    'GET /groups/{groupId}/decks': ['admin', 'contributor'],
    'POST /groups/{groupId}/decks': ['admin', 'contributor'],
    'DELETE /groups/{groupId}/decks/{deckId}': ['admin', 'contributor'],
    'PUT /groups/{groupId}/decks/{deckId}': ['admin', 'contributor'],
    'GET /cards/{cardId}/decks': ['admin', 'contributor'],
    'POST /cards/{cardId}/decks': ['admin', 'contributor'],
    'DELETE /cards/{cardId}/decks/{deckId}': ['admin', 'contributor'],
    'PUT /cards/{cardId}/decks/{deckId}': ['admin', 'contributor'],
    'PUT /users/{id}/me': ['admin', 'contributor', 'student']

}

module.exports = (req, res, next) => {
    const endpoint = `${req.method} ${req.swagger.pathName}`;
    if (!req.headers.authorization && endpoints[endpoint].includes('anonymus')) {
        return next();
    } else if (!req.headers.authorization) {
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
