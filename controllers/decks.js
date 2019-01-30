const express = require('express');
const decks = express();
const models = require('../models');

// INDEX
decks.get('/', (req, res) => {
    models.Deck.findAll()
      .then(decks => {
        res.json(decks);
      });
  });

  // SHOW
  decks.get('/:id', (req, res) => {
      models.Deck.findById(req.params.id)
      .then(decks => {
        res.json(decks);
      });
  })
  
  // CREATE
  decks.post('/', (req, res) => {
    models.Deck.create({
      subject: req.body.subject
    })
      .then(deck => {
        res.json(deck);
      });
  });

  // UPDATE
decks.put('/:id', (req, res) => {
    models.Deck.update(req.body,
      {where: {id: req.params.id}
      })
      .then(deck => {
        res.json(deck);
      });
  });

  // DELETE
decks.delete('/:id', (req, res) => {
    models.Deck.findById(req.params.id)
      .then(deck => {
        models.Deck.destroy({
          where: {
            id: req.params.id}
        })
          .then(decks => {
            res.json(decks);
          });
      });
  });

  module.exports = decks;