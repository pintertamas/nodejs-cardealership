const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({secret: 'secret'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('static'));
app.use(express.static('public'));

// Load routing
require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

app.listen(3000, function () {
    console.log('Listening on :3000');
});