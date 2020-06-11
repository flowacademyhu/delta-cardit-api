const jwt = require('jsonwebtoken');
const models = require('../../models');
const config = require('../../config/config');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization && req.swagger['x-roles'].includes('anonymus')) {
    next();
    return;
  } else if (!req.headers.authorization) {
    res.sendStatus(403);
    return;
  }
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, config.JWT_SECRET);
  const userId = decoded.id;
  const user = await models.User.findById(userId);
  req.user = user;
  if (req.swagger['x-roles'].includes(user.role)) {
    next();
  } else {
    res.sendStatus(403);
  }
};
