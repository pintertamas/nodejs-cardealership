/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof req.session.loggedIn === 'undefined') {
            console.log("auth failed -> / " + req.session.loggedIn);
            return res.redirect('/');
        }
        console.log("auth passed -> next()");
        next();
    };
};
