const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.use(express.static('static'));
app.use( express.static('public'));

// Load routing
require('./route/index')(app);

app.listen(3000, function () {
    console.log('Listening on :3000');
});