require('dotenv').config(); // Sets up dotenv as soon as our application starts

const
    express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    routes = require('./routes/index.js');

const app = express();
const router = express.Router();

const server = http.createServer(app)

// INIT SOCKER SERVICE
const io = socketio(server)
let emitter = require('./controllers/events/Event')
let saveEmitter = emitter.myEmitter;

io.on('connect', socket => {
    saveEmitter.on('notification', prop => {
        socket.emit('notifications', prop)
    })
})


const environment = process.env.NODE_ENV; // development
const port = process.env.PORT || 3001

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger('dev'));

if (environment === 'production') {
    app.use('/api/v1', routes(router))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.use('/api/v1', routes(router))
}

server.listen(port, () => {
    console.log(`Server now listening at http://localhost:${port}`);
});

module.exports = app;
