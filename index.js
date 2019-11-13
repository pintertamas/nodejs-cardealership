const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('static'));
app.use(express.static('public'));

app.use(session({
    secret: "cookie_secret",
    name: "cookie",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

// Load routing
require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

app.listen(3000, function () {
    console.log('Listening on :3000');
});