const express = require('express');
const users = express();
const models = require('../models');

// INDEX
users.get('/', (req, res) => {
    models.User.findAll()
        .then(users => {
            res.json(users)
        }).catch(function (err) {
            return res.status(400).json({ message: "Failed to show users" });;
        });
});

// SHOW
users.get('/:id', (req, res) => {
    models.User.findById(req.params.id)
        .then(user => {
            if (!user) {
                throw new Error('User with given id does not exist')
            }
            return res.json(user);
        }).catch(err => {
            return res.status(400).json({ message: err.message });
        });
});

// CREATE
users.post('/', (req, res) => {
    models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        role: req.body.role,
        lastLogin: req.body.lastLogin
    }).then(user => {
        return res.json(user)
    }).catch(err => {
        return res.status(400)
            .json({ message: 'Failed to create user' });
    });

});

// UPDATE
users.put('/:id', (req, res) => {
    const params = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        role: req.body.role,
        lastLogin: req.body.lastLogin
    };

    models.User.update(params,
        {
            where: { id: req.params.id }
        })
        .then(user => {
            res.json(user)
        }).catch(err => {
            return res.status(400).json({ message: "Failed to update user" });
        });
});

// DELETE
users.delete('/:id', (req, res) => {
    models.User.destroy({
        where: { id: req.params.id }
    }).then(user => {
        if (!user) {
            throw new Error('User with given id does not exist');
        }
        return res.json(user);
    }).catch(err => {
        return res.status(400).json({ message: err.message });
    });
});

module.exports = users;
