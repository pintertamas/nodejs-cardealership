/**
 * Destroy current session for the user and redirect to main page
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        delete req.session.loggedIn;
        delete req.session.admin;
        delete req.sessionID;
        req.session.destroy(err => {
            console.log("logging off...");
            res.redirect('/');
        });
    };
};