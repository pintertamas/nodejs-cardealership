/**
 * Load a car from the database using the :carid param
 * The result is saved to res.locals.car
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
