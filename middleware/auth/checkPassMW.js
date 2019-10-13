/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /shop
 * If the username is admin and the password is correct, redirect to /admin/carList
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};
