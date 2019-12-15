/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /shop
 * If the name is admin and the password is correct, redirect to /admin/carList
 */

module.exports = function() {
    return function(req, res, next) {
        if (req.session.admin === false) {
            return res.redirect('/logout');
        }
        return next();
    };
};
