const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cards = require('./controllers/cards');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/cards', cards);
app.use('/users', users);

app.listen(8000);