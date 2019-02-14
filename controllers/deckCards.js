const express = require('express');
const deckCards = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW CARDS BY DECKID
deckCards.get('/', (req, res) => {
  models.Card_Deck.findAll({ where: { DeckId: req.params.deckId } })
    .then(cards => {
      res.json(cards);
    });
});

module.exports = deckCards;
