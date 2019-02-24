const express = require('express');
const groups = express.Router({ mergeParams: true });
const models = require('../models');

// index
groups.get('/', (req, res) => {
  models.Group.findAll({ order: [['id', 'ASC']] })
    .then(groups => {
      res.json(groups);
    });
});

// show
groups.get('/:id', (req, res) => {
  models.Group.findById(req.params.id)
    .then(group => {
      if (!group) {
        throw new Error('Group with given id does not exist');
      }
      return res.json(group);
    }).catch(err => {
      return res.status(400).json({ message: err.message });
    });
});

// create
groups.post('/', (req, res) => {
  models.Group.create({
    name: req.body.name
  }).then(group => {
    if (req.body.deckId) {
      models.Group_Deck.create({
        GroupId: group.id,
        DeckId: req.body.deckId
      }).then(deckGroup => {
        group.dataValues.deckGroup = deckGroup;
        res.status(200).json(group);
      }).catch(error => {
        res.status(500).json({ error: error, message: error.message });
      })
    } else {
      res.status(200).json(group);
    }
  }).catch(error => {
    res.status(500).json({ error: error, message: error.message });
  });
});

// update
groups.put('/:id', (req, res) => {
  models.Group.update(req.body, { where: { id: req.params.id } })
    .then(group => {
      if (group == 0) {
        throw new Error('Group with given id does not exist');
      }
      return res.json(group);
    }).catch(err => {
      return res.status(400)
        .json({ message: err.message });
    });
});

// delete
groups.delete('/:id', (req, res) => {
  models.User.update({GroupId: null}, {where: { GroupId: req.params.id}})
  .then(() => {
    models.Group_Deck.destroy({where: {GroupId: req.params.id}});
    models.Group.destroy({
      where: { id: req.params.id }
    }).then(group => {
      if (!group) {
        throw new Error('Group with given id does not exist');
      }
      return res.json(group);
    }).catch(err => {
      return res.status(400).json({ message: err.message });
    });
  })
  
});

module.exports = groups;
