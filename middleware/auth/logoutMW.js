/**
 * Destroy current session for the user and redirect to main page
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        req.session.destroy(err => {
            console.log("logging off...");
            res.redirect('/');
        });
    };
};