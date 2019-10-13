/**
 * Using POST params update or save a car to the database
 * If res.locals.car is there, it's an update otherwise this middleware creates an entity
 * Redirects to /admin/CarList after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
