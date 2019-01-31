const express = require('express');
const decks = express();
const models = require('../models');

// INDEX
decks.get('/', (req, res) => {
    models.Deck.findAll()
      .then(decks => {
        res.json(decks)
        .catch(function (err) {
          return res.status(400).json({ message: "Failed to show decks" });
        });
      });
  });

  // SHOW
  decks.get('/:id', (req, res) => {
      models.Deck.findById(req.params.id)
      .then(decks => {
        res.json(decks)
        .catch(function (err) {
          return res.status(400).json({ message: "Failed to show deck" });
        });
      });
  })
  
  // CREATE
  decks.post('/', (req, res) => {
    models.Deck.create({
      subject: req.body.subject
    })
      .then(deck => {
        res.json(deck)
        .catch(function (err) {
          return res.status(400).json({ message: "Failed to create deck" });
        });
      });
  });

  // UPDATE
decks.put('/:id', (req, res) => {
    models.Deck.update(req.body,
      {where: {id: req.params.id}
      })
      .then(deck => {
        res.json(deck)
        .catch(function (err) {
          return res.status(400).json({ message: "Failed to update deck" });
        });
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
            res.json(decks)
            .catch(function (err) {
              return res.status(400).json({ message: "Failed to delete deck" });
            });
          });
      });
  });

  module.exports = decks;