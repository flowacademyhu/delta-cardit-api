const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');

app.use(bodyParser.json());

app.listen(8000);