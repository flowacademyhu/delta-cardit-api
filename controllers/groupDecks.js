const express = require('express');
const groupDecks = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW GROUPS BY DECKID
groupDecks.get('/', (req, res) => {
  models.Group_Deck.findAll({ where: { GroupId: req.params.groupId } })
    .then(decks => {
      res.json(decks);
    });
});

module.exports = groupDecks;
