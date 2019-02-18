const express = require('express');
const deckGroups = express.Router({ mergeParams: true });
const models = require('../models');

// SHOW GROUPS BY DECKID
deckGroups.get('/', (req, res) => {
  models.Group_Deck.findAll({ where: { DeckId: req.params.deckId } })
    .then(group_decks => {
      let groupPromises = [];
      group_decks.forEach(group => {
        if (group.dataValues.GroupId) {
          const groupPromise = models.Group.findOne({where: {id: group.dataValues.GroupId}});
          groupPromises.push(groupPromise);
        }      
    })
    Promise.all(groupPromises).then(groups => {
      res.status(200).json(groups)
    });
    });
});

module.exports = deckGroups;
