const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    email: String,
    username: String,
    password: String,
});

module.exports = User;
