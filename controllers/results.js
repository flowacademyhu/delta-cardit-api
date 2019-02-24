const express = require('express');
const results = express();
const models = require('../models');

// INDEX
results.get('/', (req, res) => {
  models.Result.findAll()
    .then(results => {
      res.json(results);
    });
});

// SHOW
results.get('/:id', (req, res) => {
  models.Result.findById(req.params.id)
    .then(results => {
      res.json(results);
    });
});

// CREATE
results.post('/', (req, res) => {
  models.Result.create({
    isCorrect: req.body.isCorrect,
    CardId: req.body.cardId,
    UserId: req.body.userId
  })
    .then(result => {
      res.json(result);
    });
});

// UPDATE
results.put('/:id', (req, res) => {
  models.Result.update(req.body,
    { where: { id: req.params.id }
    })
    .then(result => {
      res.json(result);
    });
});

// DELETE
results.delete('/:id', (req, res) => {
  models.Result.findById(req.params.id)
    .then(result => {
      models.Result.destroy({
        where: {
          id: req.params.id }
      })
        .then(results => {
          res.json(results);
        });
    });
});

module.exports = results;
