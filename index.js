const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cards = require('./controllers/cards');
const users = require('./controllers/users');
const decks = require('./controllers/decks');
const groups = require('./controllers/groups');
const results = require('./controllers/results');
const deckGroups = require('./controllers/deckGroups');
const groupDecks = require('./controllers/groupDecks');
const cardResults = require('./controllers/cardResults');
const deckCards = require('./controllers/deckCards');
const cardDecks = require('./controllers/cardDecks');
const groupUsers = require('./controllers/groupUsers');
const resultUsers = require('./controllers/resultUsers');
const createMiddleware = require('swagger-express-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerFilePath = __dirname + '/config/swagger.json';
const auth = require('./controllers/middleware/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

createMiddleware(swaggerFilePath, app, (err, middleware) => {
  if (err) return console.log(err);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(swaggerFilePath)));
  app.use(middleware.metadata());
  app.use(middleware.CORS());
  app.use(middleware.files());
  app.use(middleware.parseRequest());
  app.use(middleware.validateRequest());
  app.use(auth);
  app.use('/decks/:deckId/cards', deckCards);
  app.use('/users', users);
  app.use('/cards', cards);
  app.use('/decks', decks);
  app.use('/groups', groups);
  app.use('/results', results);
  app.use('/groups/:groupId/decks', groupDecks);
  app.use('/decks/:deckId/groups', deckGroups);
  app.use('/decks/:deckId/cards', deckCards);
  app.use('/cards/:cardId/decks', cardDecks);
  app.use('/cards/:cardId/results', cardResults);
  app.use('/groups/:groupId/users', groupUsers);
  app.use('/users/:userId/results', resultUsers);
});

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}...`);
});

module.exports = app;
