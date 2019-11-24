/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof req.session.loggedIn === 'undefined' || req.session.loggedIn !== req.sessionID) {
            console.log("auth failed -> / " + req.sessionID + " " + req.session.loggedIn);
            return res.redirect('/');
        }
        console.log("auth passed -> next() " + req.sessionID + " " + req.session.loggedIn);
        next();
    };
};
