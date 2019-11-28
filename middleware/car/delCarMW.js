/**
 * Removes a car from the database, the entity used here is: res.locals.car
 * Redirects to /admin/carList after delete
 */
const requireOption = require('../requireOption');
const fs = require('fs');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.car === 'undefined') {
            return next();
        }

        fs.unlink(`public/uploads/${res.locals.car.path}.jpg`, (err) => {
            if (err) return next(err);
            console.log('successfully deleted ' + `public/uploads/${res.locals.car.path}.jpg`);
        });

        res.locals.car.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/admin/carlist');
        });
    };
};
