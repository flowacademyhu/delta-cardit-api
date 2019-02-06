const jwt = require('jsonwebtoken');
const models = require('../../models/user');
const paths = {
    '/users/login': ['anonymus'],
    '/cards': ['admin', 'contributor', 'user']
}
module.exports = (req, res, next) => {
    if (!req.header.authorization && paths[req.path].includes('anonymus')) {
        return next();
    }
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "myverysecretsecret");
        req.userData = decoded;
        console.log(token, decoded);
        models.User.findById(encoded.id)
            .then(user => {
                req.user = user;
                if(paths[req.path].includes(user.role) ) {
                    next();
                } else {
                    res.status(403).send('Unauthorized');
                }
            });
    } catch (error) {
        return res.status(401).json({ message: "Auth failed" });
    }
}