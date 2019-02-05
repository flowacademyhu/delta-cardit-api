const express = require('express');
const results = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW RESULT BY USERID
results.get('/', (req, res) => {
    models.Result.findAll({where: { UserId: req.params.userId }})
      .then(results => {
        res.json(results);
      });
  });

  module.exports = results;