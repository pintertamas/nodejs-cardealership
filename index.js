const express = require('express');
const app = express();

// Load routing
require('./route/index')(app);

app.use(express.static('static'));
app.listen(3000, function () {
    console.log('Hello :3000');
});