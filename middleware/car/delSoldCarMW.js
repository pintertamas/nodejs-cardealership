/**
 * Removes a car from the database, the entity used here is: res.locals.car
 * Redirects to /admin/soldCars after delete
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.car === 'undefined') {
            return next();
        }

        res.locals.car.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/admin/sold');
        });
    };
};
