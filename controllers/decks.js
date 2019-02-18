const express = require('express');
const decks = express.Router();
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
    res.status(200).json(deck);
  }).catch(error => {
    res.status(500).json({ error: error, message: error.message });
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
        .json({ error: err, message: err.message });
    });
});

// DELETE
decks.delete('/:id', (req, res) => {
    models.Card_Deck.destroy({where: {DeckId: req.params.id}});
    models.Group_Deck.destroy({where: {DeckId: req.params.id}});
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
