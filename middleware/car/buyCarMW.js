/**
 * Delete a car from the carList table using the :carid param
 * Adds the car to the soldCars teble
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {

        return res.redirect('/shop');
    };
};
