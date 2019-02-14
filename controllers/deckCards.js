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

// delete
deckCards.delete('/:cardId', (req, res) => {
  models.Card_Deck.destroy({
    where: { CardId: req.params.cardId,
      DeckId: req.params.deckId }
  }).then(deckCards => {
    if (!deckCards) {
      throw new Error('DeckCards with given id does not exist');
    }
    return res.json(deckCards);
  }).catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

// update
deckCards.put('/:cardId', (req, res) => {
  const params = {
    CardId: req.body.cardId
  };
  models.Card_Deck.update(params, { where: {
    CardId: req.params.cardId,
    DeckId: req.params.deckId } })
    .then(deckCards => {
      if (deckCards === 0) {
        throw new Error('DeckCard with given id does not exist');
      }
      return res.json(deckCards);
    }).catch(err => {
      return res.status(400)
        .json({ message: err.message });
    });
});

module.exports = deckCards;
