const express = require('express');
const users = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mailgunConfig = require('../config/mailgun.json');
const generator = require('generate-password');

// INDEX
users.get('/', (req, res) => {
  models.User.findAll()
    .then(users => {
      res.json(users);
    }).catch(function (err) {
      return res.status(400).json({ message: 'Failed to show users' });
    });
});

const createUser = (body, passwordHash) => {
  return models.User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    passwordHash: passwordHash,
    role: body.role,
    GroupId: body.GroupId
  });
};
// CREATE
users.post('/', async (req, res) => {
  try {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const user = await createUser(req.body, passwordHash);
    sendMail(req.body.password, req.body.email);
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Failed to create user' });
  }
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

// UPDATE
users.put('/:id', (req, res) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        req.body.passwordHash = hash;
        models.User.update(req.body,
          {
            where: { id: req.params.id }
          })
          .then(user => {
            res.json(user);
          }).catch(err => {
            return res.status(400).json({ message: 'Failed to update user' });
          });
      }
    });
  } else {
    models.User.update(req.body,
      {
        where: { id: req.params.id }
      })
      .then(user => {
        res.json(user);
      }).catch(err => {
        return res.status(400).json({ message: 'Failed to update user' });
      });
  }
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

// UPDATE OWN PASSWORD
users.put('/me', async (req, res) => {
  try {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const user = await req.user.update({ passwordHash });
    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Failed to update password' });
  }
});

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
            { expiresIn: '1h' });
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

// FORGET PASSWORD
users.put('/login/password', (req, res) => {
  const password = generator.generate({
    length: 10,
    numbers: true
  });
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      models.User.update({
        passwordHash: hash
      },
        {
          where: { email: req.body.email }
        })
        .then(user => {
          sendMail(password, req.body.email);
          return res.json(user);
        }).catch(err => {
          return res.status(400).json({ message: err.message });
        });
    }
  });
});

const sendMail = (password, email) => {
  const apiKey = mailgunConfig.api_key;
  const domain = mailgunConfig.domain;
  const mailgun = require('mailgun-js')({ apiKey, domain: domain });

  const data = {
    from: 'Flow Academy CardIT <flowcardit@gmail.com>',
    to: `${email}`,
    subject: 'Registration',
    text: `Kedves regisztráló! A bejelenkezéshez való jelszavad: ${password}`
  };

  mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log('error: ', error);
    }
    console.log('body', body);
  });
};

module.exports = users;
