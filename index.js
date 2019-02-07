const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cards = require('./controllers/cards');
const users = require('./controllers/users');
const decks = require('./controllers/decks');
const groups = require('./controllers/groups');
const results = require('./controllers/results');
const deckGroups = require('./controllers/deckGroups');
const cardResults = require('./controllers/cardResults');
const deckCards = require('./controllers/deckCards');
const groupUsers = require('./controllers/groupUsers');
const resultUsers = require('./controllers/resultUsers');
const createMiddleware = require('swagger-express-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerFilePath = './config/swagger.json';
const auth = require('./controllers/middleware/check-auth-admin');

app.use(auth);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/cards', cards);
app.use('/users', users);
app.use('/decks', decks);
app.use('/groups', groups);
app.use('/results', results);
app.use('/decks/:deckId/groups', deckGroups);
app.use('/cards/:cardId/results', cardResults);
app.use('/decks/:deckId/cards', deckCards);
app.use('/groups/:groupId/users', groupUsers);
app.use('/users/:userId/results', resultUsers);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(swaggerFilePath)));

createMiddleware(swaggerFilePath, app, (err, middleware) => {
    if (err) return console.log(err);
    app.use(
        middleware.metadata(),
        middleware.CORS(),
        middleware.files(),
        middleware.parseRequest(),
        middleware.validateRequest()
    );
});

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}...`)
  });