const express = require('express');
const decks = express();
const models = require('../models');

// INDEX
decks.get('/', (req, res) => {
  models.Deck.findAll()
    .then(decks => {
      res.json(decks);
    }).catch(function (err) {
      return res.status(400).json({ message: 'Failed to show decks' });
    });
});

// SHOW
decks.get('/:id', (req, res) => {
  models.Deck.findById(req.params.id)
    .then(deck => {
      if (!deck) {
        throw new Error('Deck with given id does not exist');
      }
      return res.json(deck);
    }).catch(err => {
      return res.status(400).json({ message: err.message });
    });
});

/// create
decks.post('/', (req, res) => {
  models.Deck.create({
    subject: req.body.subject
  }).then(deck => {
    const deckCardPromises = [];
    for (let i = 0; i < req.body.cardId.length; i++) {
      const deckCardPromise = models.Card_Deck.create({
        DeckId: deck.id,
        CardId: req.body.cardId[i]
      });

      deckCardPromises.push(deckCardPromise);
    }
    Promise.all(deckCardPromises)
      .then(deckCards => {
        console.log(deckCards);
        deck.dataValues.deckCards = deckCards;
        res.status(200).json(deck);
      })
      .catch(error => {
        res.status(500).json({ error: error, message: 'Első catch' });
      });
  }).catch(error => {
    res.status(500).json({ error: error, message: 'Második catch' });
  });
});

// UPDATE
decks.put('/:id', (req, res) => {
  const params = { subject: req.body.subject };
  models.Deck.update(params, { where: { id: req.params.id } })
    .then(deck => {
      if (deck === 0) {
        throw new Error('Deck with given id does not exist');
      }
      return res.json(deck);
    }).catch(err => {
      return res.status(400)
        .json({ message: err.message });
    });
});

// DELETE
decks.delete('/:id', (req, res) => {
  models.Deck.destroy({
    where: { id: req.params.id }
  }).then(deck => {
    if (!deck) {
      throw new Error('Deck with given id does not exist');
    }
    return res.json(deck);
  }).catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

module.exports = decks;
