const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;

// Database connection
const db = require('./config/database');

try {
    db.authenticate().then(() => {
        console.log('Connection has been established');
    });
} catch(error){
    console.log('Unable to connect to database');
}


db.sync({ }).then(() => {
    console.log('Creating tables..', db.models);
} );

const app = express();
const learningGoalsRoute = require('./api/learning-goals');
const tasksRoute = require('./api/tasks');
const resourcesRoute = require('./api/resources');

const logger = (req, res, next) => {
    console.log(`${req.method} to url: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

// app.use(logger);
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader( 'Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(learningGoalsRoute);
app.use(tasksRoute);
app.use(resourcesRoute);


app.get('/', function (req, res) {
    res.send('Progressive learning back-end server');
});

app.listen(port);