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
          const deckPromise = models.Deck.findOne({where: {id: deck.dataValues.DeckId}});
          deckPromises.push(deckPromise);
        }      
    })
    Promise.all(deckPromises).then(decks => {
      res.status(200).json(decks)
    });
    });
});


// CREATE DECKGROUPS
groupDecks.post('/', (req, res) => {
  models.Group_Deck.create({
    GroupId: req.params.groupId
  }).then(groupDecks => {
    const deckGroupPromises = [];
    for (let i = 0; i < req.body.deckId.length; i++) {
      const deckGroupPromise = models.Group_Deck.create({
        GroupId: req.params.groupId,
        DeckId: req.body.deckId[i]
      });
      deckGroupPromises.push(deckGroupPromise);
    }
    Promise.all(deckGroupPromises)
      .then(groupDecks => {
        console.log(groupDecks);
        res.status(200).json(groupDecks);
      })
      .catch(error => {
        res.status(500).json({ error: error, message: 'Első catch' });
      });
  }).catch(error => {
    res.status(500).json({ error: error, message: 'Második catch' });
  });
});

// delete
groupDecks.delete('/:deckId', (req, res) => {
  models.Group_Deck.destroy({
    where: { GroupId: req.params.groupId,
      DeckId: req.params.deckId }
  }).then(groupDecks => {
    if (!groupDecks) {
      throw new Error('DeckGroups with given id does not exist');
    }
    return res.json(groupDecks);
  }).catch(err => {
    return res.status(400).json({ message: err.message });
  });
});

// update
groupDecks.put('/:deckId', (req, res) => {
  const params = {
    DeckId: req.body.deckId
  };
  models.Group_Deck.update(params, { where: {
    GroupId: req.params.groupId,
    DeckId: req.params.deckId } })
    .then(groupDecks => {
      if (groupDecks === 0) {
        throw new Error('DeckCard with given id does not exist');
      }
      return res.json(groupDecks);
    }).catch(err => {
      return res.status(400)
        .json({ message: err.message });
    });
});

module.exports = groupDecks;
