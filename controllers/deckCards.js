const express = require('express');
const deckCards = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW CARDS BY DECKID
deckCards.get('/', (req, res) => {
  models.Card_Deck.findAll({ where: { DeckId: req.params.deckId } })
    .then(card_decks => {
      let cardPromises = [];
      card_decks.forEach(card => {
        if (card.dataValues.CardId) {
          const cardPromise = models.Card.findOne({ where: { id: card.dataValues.CardId } });
          cardPromises.push(cardPromise);
        }
      });
      Promise.all(cardPromises).then(cards => {
        res.status(200).json(cards);
      });
    });
});

module.exports = deckCards;
