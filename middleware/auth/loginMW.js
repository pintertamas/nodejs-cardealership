/**
 * Logs in the user by redirecting to /shop
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        return res.redirect('/shop');
    };
};
