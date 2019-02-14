const express = require('express');
const deckGroups = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW DECKS BY GROUPID
deckGroups.get('/', (req, res) => {
  models.Group_Deck.findAll({ where: { GroupId: req.params.groupId } })
    .then(decks => {
      res.json(decks);
    });
});

// SHOW GROUPS BY DECKID
deckGroups.get('/', (req, res) => {
  models.Group.findAll({ where: { DeckId: req.params.deckId } })
    .then(groups => {
      res.json(groups);
    });
});

module.exports = deckGroups;
