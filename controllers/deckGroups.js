const express = require('express');
const groups = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW GROUPS BY DECKID
groups.get('/', (req, res) => {
  models.Group.findAll({where: { DeckId: req.params.deckId } })
    .then(groups => {
      res.json(groups);
    });
});

module.exports = groups;