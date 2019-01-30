const express = require('express');
const cards = express();
const models = require('../models');

// index
cards.get('/', (req, res) => {
    models.Card.findAll({ order: [['id', 'ASC']] }).then(cards => {
        res.json(cards);
    });
});

// show
cards.get('/:id', (req, res) => {
    models.Card.findById(req.params.id).then(card => {
        res.json(card);
    });
});

// create
cards.post('/', (req, res) => {
    models.Card.create({
        question: req.body.question,
        answer: req.body.answer,
        difficulty: req.body.difficulty,
        type: req.body.type
    }).then(card => {
        res.json(card);
    });
});

// update
cards.put('/:id', (req, res) => {
    models.Card.update(req.body, { where: { id: req.params.id } }).then(card => {
        res.json(card);
    });
});

// delete
cards.delete('/:id', (req, res) => {
    models.Card.destroy({ where: { id: req.params.id } }).then(cards => {
        res.json(cards);
    });
});

module.exports = cards;
