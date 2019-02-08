const express = require('express');
const users = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// LOGIN
users.post('/login', (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed1'
        });
      }
      bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
        if (err || !result) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              id: user.id
            },
            config.JWT_SECRET,
            { expiresIn: '1h' })
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// INDEX
users.get('/', (req, res) => {
  models.User.findAll()
    .then(users => {
      res.json(users)
    }).catch(function (err) {
      return res.status(400).json({ message: "Failed to show users" });
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
  bcrypt.hash(req.body.passwordHash, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    } else {
      models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordHash: hash,
        role: req.body.role,
        GroupId: req.body.GroupId
      }).then(user => {
        return res.json(user)
      }).catch(err => {
        return res.status(400)
          .json({ message: 'Failed to create user' });
      });
    }
  })


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
