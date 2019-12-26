require('dotenv').config(); // Sets up dotenv as soon as our application starts

const
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    routes = require('./routes/index.js');


const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // development
// const stage = require('./config')[environment];
const port = process.env.PORT || 3001

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Morgan Loger based on the prod or dev flag
if (environment !== 'production') {
    app.use(logger('dev'));
}

// ROUTE
app.use('/api/v1', routes(router))

app.listen(port, () => {
    console.log(`Server now listening at http://localhost:${port}`);
});

module.exports = app;
