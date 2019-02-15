const express = require('express');
const deckGroups = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW DECKS BY GROUPID
deckGroups.get('/', (req, res) => {
  models.Group_Deck.findAll({ where: { DeckId: req.params.deckId } })
    .then(groups => {
      res.json(groups);
    });
});

// CREATE DECKGROUPS
deckGroups.post('/', (req, res) => {
  models.Group_Deck.create({
    DeckId: req.params.groupId
  }).then(deckGroups => {
    const deckGroupPromises = [];
    for (let i = 0; i < req.body.groupId.length; i++) {
      const deckGroupPromise = models.Group_Deck.create({
        DeckId: req.params.deckId,
        GroupId: req.body.groupId[i]
      });
      deckGroupPromises.push(deckGroupPromise);
    }
    Promise.all(deckGroupPromises)
      .then(deckGroups => {
        console.log(deckGroups);
        res.status(200).json(deckGroups);
      })
      .catch(error => {
        res.status(500).json({ error: error, message: 'Első catch' });
      });
  }).catch(error => {
    res.status(500).json({ error: error, message: 'Második catch' });
  });
});

// delete
deckGroups.delete('/:groupId', (req, res) => {
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
deckGroups.put('/:groupId', (req, res) => {
  const params = {
    GroupId: req.body.groupId
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
