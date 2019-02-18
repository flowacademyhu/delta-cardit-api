const express = require('express');
const users = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mailgunConfig = require('../config/mailgun.json');

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
              id: user.id,
              role: user.role
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
      return res.status(400).json({ message: 'Failed to show users' });
    });
});

// SHOW
users.get('/:id', (req, res) => {
  models.User.findById(req.params.id)
    .then(user => {
      if (!user) {
        throw new Error('User with given id does not exist');
      }
      return res.json(user);
    }).catch(err => {
      return res.status(400).json({ message: err.message });
    });
});

// CREATE
users.post('/', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
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
        sendMail(req.body.password, req.body.email);
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
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        })
      } else {
        req.body.passwordHash = hash;
        models.User.update(req.body,
          {
            where: { id: req.params.id }
          })
          .then(user => {
            res.json(user)
          }).catch(err => {
            return res.status(400).json({ message: "Failed to update user" });
          });
      }
    });
  } else {
    models.User.update(req.body,
      {
        where: { id: req.params.id }
      })
      .then(user => {
        res.json(user)
      }).catch(err => {
        return res.status(400).json({ message: "Failed to update user" });
      });
  }
});

// UPDATE OWN PASSWORD
users.put('/:id/me', (req, res) => {
  models.User.findById(req.params.id)
    .then(user => {
      if (user.id === req.user.id) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            req.body.passwordHash = hash;
            models.User.update(
              { passwordHash: req.body.passwordHash, updatedAt: new Date() },
              { where: { id: req.params.id } })
              .then(user => {
                res.json(user)
              }).catch(err => {
                return res.status(400).json({ message: "Failed to update password" });
              });
          }
        });
      } else {
        res.status(401).json({message: "Unauthorized"});
      }
    })
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

const sendMail = (password, email) => {
  var api_key = mailgunConfig.api_key;
  var domain = mailgunConfig.domain;
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

  let data = {
    from: 'Flow Academy CardIT <flowcardit@gmail.com>',
    to: `${email}`,
    subject: 'Registration',
    text: `Kedves regisztráló! A bejelenkezéshez való jelszavad: ${password}`
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log("error: ", error);
    }
    console.log("body", body);
  });
};

module.exports = users;
