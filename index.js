const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cards = require('./controllers/cards');
const users = require('./controllers/users');
const groups = require('./controllers/groups');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/cards', cards);
app.use('/users', users);
app.use('/groups', groups);

app.listen(8000);