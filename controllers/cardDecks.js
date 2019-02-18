const express = require('express');
const cardDecks = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW DECKS BY CARDID
cardDecks.get('/', (req, res) => {
  models.Card_Deck.findAll({ where: { CardId: req.params.cardId } })
    .then(decks => {
      res.json(decks);
    });
});

// CREATE CARDDECK
cardDecks.post('/', (req, res) => {
  //models.Card_Deck.create({
    //CardId: req.params.cardId
  //}).then(cardDecks => {
    const deckCardPromises = [];
    for (let i = 0; i < req.body.deckId.length; i++) {
      const deckCardPromise = models.Card_Deck.create({
        CardId: req.params.cardId,
        DeckId: req.body.deckId[i]
      });
      deckCardPromises.push(deckCardPromise);
    }
    Promise.all(deckCardPromises)
      .then(cardDecks => {
        console.log(cardDecks);
        res.status(200).json(cardDecks);
      })
      .catch(error => {
        res.status(500).json({ error: error, message: 'Első catch' });
      });
 // }).catch(error => {
 //   res.status(500).json({ error: error, message: 'Második catch' });
//  });
});

// delete
cardDecks.delete('/:deckId', (req, res) => {
  models.Card_Deck.destroy({
    where: { CardId: req.params.cardId,
      DeckId: req.params.deckId }
  }).then(cardDecks => {
    if (!cardDecks) {
      throw new Error('CardDeck with given id does not exist');
    }
    return res.json(cardDecks);
  }).catch(err => {
    return res.status(400).json({ message: err.message });
  });
});



module.exports = cardDecks;
