const express = require('express');
const resultUsers = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW RESULT BY USERID
resultUsers.get('/', (req, res) => {
  models.Result.findAll({ where: { UserId: req.params.userId } })
    .then(results => {
      res.json(results);
    });
});

module.exports = resultUsers;
