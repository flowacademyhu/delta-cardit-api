const express = require('express');
const groupUsers = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW USERS BY GROUPID
groupUsers.get('/', (req, res) => {
  models.User.findAll({ where: { GroupId: req.params.groupId } })
    .then(users => {
      res.json(users);
    });
});

module.exports = groupUsers;
