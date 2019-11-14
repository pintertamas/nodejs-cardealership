const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Car = db.model('Car', {
    brand: String,
    year: Number,
    mileage: Number,
    price: Number,
    description: String,
    sold: Boolean,
});

module.exports = Car;
