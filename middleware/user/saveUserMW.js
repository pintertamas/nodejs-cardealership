/**
 * Using POST params update or save a user to the database
 * If res.locals.user is there, it's an update otherwise this middleware creates an entity
 * Redirects to / after success
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
