const express = require('express');
const groupDecks = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW DECKS BY GROUPID
groupDecks.get('/', (req, res) => {
  models.Deck.findAll({
    include: [
      {
        model: models.Group_Deck,
        where: { GroupId: req.params.groupId }
      }
    ]
  })
    .then(decks => {
      res.status(200).json(decks);
    });
});

// CREATE GROUPDECKS
groupDecks.post('/', (req, res) => {
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
});

// delete
groupDecks.delete('/:deckId', (req, res) => {
  models.Group_Deck.destroy({
    where: { GroupId: req.params.groupId,
      DeckId: req.params.deckId }
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
