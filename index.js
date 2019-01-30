const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);

app.listen(8000);