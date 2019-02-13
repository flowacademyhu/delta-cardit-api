const express = require('express');
const deckCards = express.Router({ mergeParams: true });
const models = require('../models');

// INDEX
deckCards.get('/', (req, res) => {
  models.Card_Deck.findAll()
    .then(deckCards => {
      res.json(deckCards);
    }).catch(function (err) {
      return res.status(400).json({ message: 'Failed to show decks' });
    });
});

// SHOW CARDS BY DECKID
deckCards.get('/', (req, res) => {
  models.Card.findAll({ where: { DeckId: req.params.deckId } })
    .then(cards => {
      res.json(cards);
    });
});

// delete
deckCards.delete('/:CardId/:DeckId', (req, res) => {
  models.Card_Deck.destroy({
    where: { CardId: req.params.CardId,
      DeckId: req.params.DeckId }
  }).then(deckCard => {
    if (!deckCard) {
      throw new Error('DeckCard with given id does not exist');
    }
    return res.json(deckCards);
  }).catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

// update
deckCards.put('/:CardId/:DeckId', (req, res) => {
  const params = {
    DeckId: req.body.DeckId,
    CardId: req.body.CardId
  };
  models.Card_Deck.update(params, { where: {
    CardId: req.params.CardId,
    DeckId: req.params.DeckId } })
    .then(deckCard => {
      if (deckCard === 0) {
        throw new Error('DeckCard with given id does not exist');
      }
      return res.json(DeskCard);
    }).catch(err => {
      return res.status(400)
        .json({ message: err.message });
    });
});

module.exports = deckCards;
