const express = require('express');
const groups = express.Router();
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
  })
    .then(group => {
      for (let i = 0; i < req.body.deckId.length; i++) {
        let objects = {
          DeckId: req.body.deckId[i],
          GroupId: group.id
        };
        models.Group_Deck.findOne({
          where: {
            DeckId: req.body.deckId[i]
          }
        })
          .then(deckGroup => {
            if (deckGroup && !deckGroup.DeckId) {
              console.log('updated');
              models.Deck_Group.update({
                GroupId: group.id,
                DeckId: req.body.deckId[i]
              }, {
                where: { DeckId: req.body.deckId[i] }
              })
                .then(deckGroup => {
                  console.log('>> >> >> DeckGroup updated!');
                  return res.status(200).json(group);
                })
                .catch(error => res.json(error));
              return res.status(200).json(group);
            } else {
              models.Deck_Group.create(objects).then(deckGroup => {
                console.log('>> >> DeckGroup created!');
                return res.status(200).json(group);
              });
            }
          })
          .catch(error => {
            console.error('DeckGroup NOT found with: ' + req.body.deckId[i]);
            res.status(404).json(error);
          });
      }
      console.log('>> >> >> BulkCreate ended!');
    }).catch(error => {
      res.status(404).json(error);
    });
  console.log('Group creating finished!');
});

// update
groups.put('/:id', (req, res) => {
  models.Group.update(req.body, { where: { id: req.params.id } })
    .then(group => {
      if (group === 0) {
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
});

module.exports = groups;
