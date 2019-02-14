const express = require('express');
const cards = express();
const models = require('../models');

// index
cards.get('/', (req, res) => {
  models.Card.findAll({ order: [['id', 'ASC']] }).then(cards => {
    res.json(cards);
  });
});

// show
cards.get('/:id', (req, res) => {
  models.Card.findById(req.params.id)
    .then(card => {
      if (!card) {
        throw new Error('Card with given id does not exist');
      }
      return res.json(card);
    }).catch(err => {
      return res.status(400).json({ message: err.message });
    });
});

// create
cards.post('/', (req, res) => {
  models.Card.create({
    question: req.body.question,
    answer: req.body.answer,
    difficulty: req.body.difficulty,
    type: req.body.type
  }).then(card => {
    const cardDeckPromises = [];
    for (let i = 0; i < req.body.deckId.length; i++) {
      const cardDeckPromise = models.Card_Deck.create({
        CardId: card.id,
        DeckId: req.body.deckId[i]
      });
      cardDeckPromises.push(cardDeckPromise);
    }
    Promise.all(cardDeckPromises)
      .then(cardDecks => {
        console.log(cardDecks);
        card.dataValues.cardDecks = cardDecks;
        res.status(200).json(card);
      })
      .catch(error => {
        res.status(500).json({ error: error, message: 'Első catch' });
      });
  }).catch(error => {
    res.status(500).json({ error: error, message: 'Második catch' });
  });
});

// update
cards.put('/:id', (req, res) => {
  const params = {
    question: req.body.question,
    answer: req.body.answer,
    difficulty: req.body.difficulty,
    type: req.body.type
  };
  models.Card.update(params, { where: { id: req.params.id } })
    .then(card => {
      if (card == 0) {
        throw new Error('Card with given id does not exist');
      }
      return res.json(card);
    }).catch(err => {
      return res.status(400)
        .json({ message: err.message });
    });
});

// delete
cards.delete('/:id', (req, res) => {
  models.Card.destroy({
    where: { id: req.params.id }
  }).then(card => {
    if (!card) {
      throw new Error('Card with given id does not exist');
    }
    return res.json(card);
  }).catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

module.exports = cards;
