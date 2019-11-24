const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//** folders */
app.use(express.static('static'));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage: storage});

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

app.listen(3000, function () {
    console.log('Listening on :3000');
});