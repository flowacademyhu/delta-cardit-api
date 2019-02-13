const express = require('express');
const cards = express();
const results = express();
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
    type: req.body.type });
  }).then(card => {
    console.log('>> Card created!');
    for (let i = 0; i < req.body.deckId.length; i++) {
    let object = { cardId: card.id, deckId: req.body.deckId[i] };
    models.Card_Deck.findOne({ where: { DeckId: req.body.deckId[i] } })
      .then(cardDeck => {
        console.log('>> >> CardDeck found!');
        console.log(cardDeck);
        if (cardDeck && !cardDeck.CardId) {
          console.log('updated');
          models.Card_Deck.update({
            CardId: card.id,
            DeckId: req.body.deckId[i]
          }, {
            where: { deckId: req.body.deckId[i] }
          })
            .then(cardDeck => {
              console.log('>> >> >> CardDeck updated!');
              return res.status(200).json(card);
            })
            .catch(error => res.json(error));
          return res.status(200).json(card);
        } else {
          models.Card_Deck.create(object).then(cardDeck => {
            console.log('>> >> CardDeck created!');
            return res.status(200).json(card);
          });
        }
      })
      .catch(error => {
        console.error('CardDeck NOT found with: ' + req.body.deckId[i]);
        res.status(404).json(error);
      });
    }
    console.log('>> >> >> BulkCreate ended!');
    }).catch(error => {
  res.status(404).json(error);
  });
  console.log('Card creating finished!');
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
