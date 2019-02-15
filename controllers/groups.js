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
    return res.json(group);
  }).catch(err => {
    return res.status(400)
      .json({ message: 'Failed to create group' });
  });
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
