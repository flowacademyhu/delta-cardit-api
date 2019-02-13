const express = require('express');
const deckGroups = express.Router({ mergeParams: true });
const models = require('../models');

// INDEX
deckGroups.get('/', (req, res) => {
  models.Group_Deck.findAll()
    .then(deckGroups => {
      res.json(deckGroups);
    }).catch(function (err) {
      return res.status(400).json({ message: 'Failed to show decks' });
    });
});

// SHOW GROUPS BY DECKID
deckGroups.get('/', (req, res) => {
  models.Group.findAll({ where: { DeckId: req.params.deckId } })
    .then(groups => {
      res.json(groups);
    });
});

// delete
deckGroups.delete('/:GroupId/:DeckId', (req, res) => {
  models.Group_Deck.destroy({
    where: { GroupId: req.params.GroupId,
      DeckId: req.params.DeckId }
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
deckGroups.put('/:GroupId/:DeckId', (req, res) => {
  const params = {
    DeckId: req.body.DeckId,
    GroupId: req.body.GroupId
  };
  models.Group_Deck.update(params, { where: {
    GroupId: req.params.GroupId,
    DeckId: req.params.DeckId } })
    .then(deckGroups => {
      if (deckGroup == 0) {
        throw new Error('DeckCard with given id does not exist');
      }
      return res.json(deckGroup);
    }).catch(err => {
      return res.status(400)
        .json({ message: err.message });
    });
});

module.exports = deckGroups;
