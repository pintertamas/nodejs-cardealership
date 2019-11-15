/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /shop
 * If the name is admin and the password is correct, redirect to /admin/carList
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (req.session.admin === true) {
            console.log('You are the admin how did u get here');
            return res.redirect('/logout');
        }
        return next();
    };
};
