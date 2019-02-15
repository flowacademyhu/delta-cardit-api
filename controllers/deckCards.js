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
          const cardPromise = models.Card.findOne({where: {id: card.dataValues.CardId}});
          cardPromises.push(cardPromise);
        }      
    })
    Promise.all(cardPromises).then(cards => {
      res.status(200).json(cards)
    });
    });
});
// CREATE DECKCARDS
deckCards.post('/', (req, res) => {
  models.Card_Deck.create({
    DeckId: req.params.deckId
  }).then(deckCards => {
    const deckCardPromises = [];
    for (let i = 0; i < req.body.cardId.length; i++) {
      const deckCardPromise = models.Card_Deck.create({
        DeckId: req.params.deckId,
        CardId: req.body.cardId[i]
      });
      deckCardPromises.push(deckCardPromise);
    }
    Promise.all(deckCardPromises)
      .then(deckCards => {
        console.log(deckCards);
        res.status(200).json(deckCards);
      })
      .catch(error => {
        res.status(500).json({ error: error, message: 'Első catch' });
      });
  }).catch(error => {
    debugger;
    res.status(500).json({ error: error, message: 'Második catch' });
  });
});

// delete
deckCards.delete('/:cardId', (req, res) => {
  models.Card_Deck.destroy({
    where: {
      CardId: req.params.cardId,
      DeckId: req.params.deckId
    }
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
  models.Card_Deck.update(params, {
    where: {
      CardId: req.params.cardId,
      DeckId: req.params.deckId
    }
  })
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
