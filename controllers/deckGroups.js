const express = require('express');
const deckGroups = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW DECKS BY GROUPID
deckGroups.get('/', (req, res) => {
  models.Group_Deck.findAll({ where: { GroupId: req.params.groupId } })
    .then(decks => {
      res.json(decks);
    });
});

// delete
deckGroups.delete('/:deckId', (req, res) => {
  models.Group_Deck.destroy({
    where: { GroupId: req.params.groupId,
      DeckId: req.params.deckId }
  }).then(deckGroups => {
    if (!deckGroups) {
      throw new Error('DeckGroups with given id does not exist');
    }
    return res.json(deckGroups);
  }).catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

// update
deckGroups.put('/:deckId', (req, res) => {
  const params = {
    DeckId: req.body.deckId
  };
  models.Group_Deck.update(params, { where: {
    GroupId: req.params.groupId,
    DeckId: req.params.deckId } })
    .then(deckGroups => {
      if (deckGroups === 0) {
        throw new Error('DeckCard with given id does not exist');
      }
      return res.json(deckGroups);
    }).catch(err => {
      return res.status(400)
        .json({ message: err.message });
    });
});

module.exports = deckGroups;
