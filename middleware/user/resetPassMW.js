/**
 * Using POST params update or save a user to the database
 * If res.locals.user is there, it sets up a new password for them, otherwise this middleware returns an error
 * Redirects to / after success
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {

    };
};
