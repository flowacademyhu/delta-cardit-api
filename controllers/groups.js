const express = require('express');
const groups = express();
const models = require('../models');

// index
groups.get('/', (req, res) => {
    models.Group.findAll({ order: [['id', 'ASC']] }).then(groups => {
        res.json(groups);
    });
});

// show
groups.get('/:id', (req, res) => {
    models.Group.findById(req.params.id).then(group => {
        res.json(group);
    });
});

// create
groups.post('/', (req, res) => {
    models.Group.create({
        name: req.body.name
    }).then(group => {
        res.json(group);
    });
});

// update
groups.put('/:id', (req, res) => {
    models.Group.update(req.body, { where: { id: req.params.id } }).then(group => {
        res.json(group);
    });
});

// delete
groups.delete('/:id', (req, res) => {
    models.Group.destroy({ where: { id: req.params.id } }).then(groups => {
        res.json(groups);
    });
});

module.exports = groups;