const express = require('express');
const cards = express();
const models = require('../models');

// index
cards.get('/', async (req, res) => {
  try {
    const cards = await models.Card.findAll({ order: [['id', 'ASC']] });
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// show
cards.get('/:id', async (req, res) => {
  try {
    const card = await models.Card.findById(req.params.id);
    if (!card) {
      throw new Error('Card with given id does not exist');
    }
    return res.json(card);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

const createCard = body => {
  return models.Card.create({
    question: body.question,
    answer: body.answer,
    difficulty: body.difficulty,
    type: body.type
  });
};

const createDeckCard = async (body, card) => {
  const deckCard = await models.Card_Deck.create({
    CardId: card.id,
    DeckId: body.deckId
  });
  card.dataValues.deckCard = deckCard;
};

// create
cards.post('/', async (req, res) => {
  try {
    const card = await createCard(req.body);
    if (req.body.deckId) {
      createDeckCard(req.body, card);
    }
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error, message: error.message });
  }
});

// update
cards.put('/:id', async (req, res) => {
  try {
    const card = await models.Card.update(req.body, { where: { id: req.params.id } });
    if (card == 0) {
      throw new Error('Card with given id does not exist');
    }
    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// delete
cards.delete('/:id', (req, res) => {
  models.Card_Deck.destroy({ where: { CardId: req.params.id } });
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
