/**
 * Redirects the user to / after registration
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log("registerMW -> /");
        res.redirect('/');
    };
};
