const express = require('express');
const cards = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW CARDS BY DECKID
cards.get('/', (req, res) => {
    models.Card.findAll({where: { DeckId: req.params.deckId }})
      .then(cards => {
        res.json(cards);
      });
  });

  module.exports = cards;