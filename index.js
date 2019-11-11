/*
const UserModel = require('./models/user');

let egyuser = new UserModel();
egyuser.email = "imel";
egyuser.username = "Gezuka";
egyuser.password = "lyelszo";
egyuser.save((err)=>{
    console.log(err);
});

*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));
app.use(express.static('public'));

app.use(
    session({
        secret: 'secret'
    })
);

// Load routing
require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('Problem...');
    console.log(err);
});

app.listen(3000, function () {
    console.log('Listening on :3000');
});