const express = require('express');
const cards = express();
const results = express();
const models = require('../models');

// index
cards.get('/', (req, res) => {
    models.Card.findAll({ order: [['id', 'ASC']] }).then(cards => {
        res.json(cards);
    });
});

// show
cards.get('/:id', (req, res) => {
    models.Card.findById(req.params.id)
        .then(card => {
            if (!card) {
                throw new Error('Card with given id does not exist')
            }
            return res.json(card);
        }).catch(err => {
            return res.status(400).json({ message: err.message });
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
        return res.json(card)
    }).catch(err => {
        return res.status(400)
            .json({ message: 'Failed to create card' });
    });

});

// update
cards.put('/:id', (req, res) => {
    const params = {
        question: req.body.question,
        answer: req.body.answer,
        difficulty: req.body.difficulty,
        type: req.body.type
    }
    models.Card.update(params, { where: { id: req.params.id } })
        .then(card => {
            if (card == 0) {
                throw new Error('Card with given id does not exist');
            }
            return res.json(card);
        }).catch(err => {
            return res.status(400)
                .json({ message: err.message });
        });
});

// delete
cards.delete('/:id', (req, res) => {
    models.Card.destroy({
        where: { id: req.params.id }
    }).then(card => {
        if (!card) {
            throw new Error('Card with given id does not exist');
        }
        return res.json(card);
    }).catch(err => {
        return res.status(400).json({ message: err.message });
    });
});

module.exports = cards;
