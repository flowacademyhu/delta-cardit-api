const express = require('express');
const users = express();
const models = require('../models');

// INDEX
users.get('/', (req, res) => {
    models.User.findAll()
      .then(users => {
        res.json(users);
      });
  });

  // SHOW
  users.get('/:id', (req, res) => {
      models.User.findById(req.params.id)
      .then(users => {
        res.json(users);
      });
  })
  
  // CREATE
  users.post('/', (req, res) => {
    models.User.create({
      firsName: req.body.firsName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: req.body.passwordHash,
      role: req.body.role,
      lastLogin: req.body.lastLogin
    })
      .then(user => {
        res.json(users);
      });
  });

  // UPDATE
users.put('/:id', (req, res) => {
    models.User.update(req.body,
      {where: {id: req.params.id}
      })
      .then(user => {
        res.json(user);
      });
  });

  // DELETE
users.delete('/:id', (req, res) => {
    models.User.findById(req.params.id)
      .then(user => {
        models.User.destroy({
          where: {
            id: req.params.id}
        })
          .then(users => {
            res.json(users);
          });
      });
  });

  module.exports = users;