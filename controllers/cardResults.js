const express = require('express');
const cardResults = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW RESULTS BY CARDID
cardResults.get('/', (req, res) => {
  models.Result.findAll({ where: { CardId: req.params.cardId } })
    .then(results => {
      res.json(results);
    });
});

module.exports = cardResults;
