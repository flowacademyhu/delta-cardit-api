const express = require('express');
const groupDecks = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW DECKS BY GROUPID
groupDecks.get('/', (req, res) => {
  models.Group_Deck.findAll({ where: { GroupId: req.params.groupId } })
    .then(group_decks => {
      let deckPromises = [];
      group_decks.forEach(deck => {
        if (deck.dataValues.DeckId) {
          const deckPromise = models.Deck.findOne({ where: { id: deck.dataValues.DeckId } });
          deckPromises.push(deckPromise);
        }
      });
      Promise.all(deckPromises).then(decks => {
        res.status(200).json(decks);
      });
    });
});

// CREATE GROUPDECKS
groupDecks.post('/', (req, res) => {
  models.Group_Deck.create({
    GroupId: req.params.groupId,
    DeckId: req.body.deckId
  })
    .then(groupDecks => {
      res.status(200).json(groupDecks);
    })
    .catch(error => {
      res.status(500).json({ error: error, message: error.message });
    });
});

// delete
groupDecks.delete('/:deckId', (req, res) => {
  models.Group_Deck.destroy({
    where: {
      GroupId: req.params.groupId,
      DeckId: req.params.deckId
    }
  }).then(groupDecks => {
    if (!groupDecks) {
      throw new Error('GroupDeck with given id does not exist');
    }
    return res.json(groupDecks);
  }).catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

module.exports = groupDecks;
