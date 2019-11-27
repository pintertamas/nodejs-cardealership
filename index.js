const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// PUBLIC and STATIC directories
app.use(express.static('./static'));
app.use(express.static('./public'));

// SESSION handling
app.use(session({
    key: 'user_sid',
    secret: 'sosecretomg',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Load routing
require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});


// Listening
const port = 3000;

app.listen(port, function () {
    console.log(`Listening on :${port}`);
});