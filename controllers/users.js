const express = require('express');
const users = express();
const models = require('../models');

// INDEX
users.get('/', (req, res) => {
    models.User.findAll()
      .then(users => {
        res.json(users)
        .catch(function (err) {
          return res.status(400).json({ message: "Failed to show users" });
        });
      });
  });

  // SHOW
  users.get('/:id', (req, res) => {
      models.User.findById(req.params.id)
      .then(users => {
        res.json(users)
        .catch(function (err) {
          return res.status(400).json({ message: "Failed to show user" });
        });
      });
  });

  // SHOW RESULTS BY USERID
  users.get('/:userId/results', (req, res) => {

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
    })
      .then(user => {
        res.json(user)
        .catch(function (err) {
          return res.status(400).json({ message: "Failed to create user" });
        });
      });
  });

  // UPDATE
users.put('/:id', (req, res) => {
    models.User.update(req.body,
      {where: {id: req.params.id}
      })
      .then(user => {
        res.json(user)
        .catch(function (err) {
          return res.status(400).json({ message: "Failed to update user" });
        });
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
            res.json(users)
            .catch(function (err) {
              return res.status(400).json({ message: "Failed to delete user" });
            });
          });
      });
  });

  module.exports = users;
