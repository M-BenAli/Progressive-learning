const express = require('express');

const bodyParser = require('body-parser');

const port = 5000;

const app = express();
const learningGoalsRoute =  require('./router/learning-goals');

const logger = (req, res, next) => {
    console.log(`${req.method} to url: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

// app.use(logger);
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader( 'Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next();
});
app.use(learningGoalsRoute);


app.get('/', function (req, res) {
    res.send('Progressive learning back-end server')
});

app.listen(port);