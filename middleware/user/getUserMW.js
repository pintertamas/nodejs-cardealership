/**
 * Load a user from the database using the :userid param
 * The result is saved to res.locals.user
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
