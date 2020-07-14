require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const port = process.env.PORT;

// Database connection
const db = require('./config/database');

try {
    db.authenticate().then(() => {
        console.log('Connection has been established');
    });
} catch (error) {
    console.log('Unable to connect to database');
}

db.sync({}).then(() => {
    console.log('Creating tables..', db.models);
});
// End database connection

// Start express app
const app = express();
const learningGoalsRoute = require('./api/learning-goals');
const tasksRoute = require('./api/tasks');
const resourcesRoute = require('./api/resources');
const subjectsRoute = require('./api/subjects');
const usersRoute = require('./api/users');
const authenticationRoute = require('./api/authentication');

/* Logger
const logger = (req, res, next) => {
    console.log(`${req.method} to url: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};
app.use(logger);
*/

// Add bodyparser
app.use(bodyParser.json());

app.set('trust proxy', 1);

//Configure cookie-session
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000
}));

const corsWhiteList = [
    'http://localhost:4200',
    'https://progressive-learning.netlify.app'
];
app.use(function (req, res, next) {
    if (corsWhiteList.includes(req.headers.origin)) {
        console.log(`Matching with a whitelisted origin: ${req.headers.origin}`);
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, HEAD');
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    next();
});

app.use(learningGoalsRoute, tasksRoute, resourcesRoute, subjectsRoute,
    authenticationRoute, usersRoute);

app.get('/', function (req, res) {
    // req.session.views = (req.session.views || 0) + 1;
    res.send('Progressive learning back-end server');
    // res.end(req.session.views);
});

app.listen(port);
