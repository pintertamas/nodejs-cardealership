/**
 * Using POST params update or save a car to the database
 * If res.locals.car is there, it's an update otherwise this middleware creates an entity
 * Redirects to /admin/CarList after success
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');

    return function(req, res, next) {
        if (
            typeof req.body.brand === 'undefined' ||
            typeof req.body.year === 'undefined' ||
            typeof req.body.mileage === 'undefined' ||
            typeof req.body.price === 'undefined' ||
            typeof res.locals.description === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.car === 'undefined') {
            res.locals.car = new CarModel();
        }

        if (Number.isNaN(parseInt(req.body.year, 10))) {
            return next(new Error('\'Year\' must be formatted to integer!'));
        }

        if (Number.isNaN(parseInt(req.body.mileage, 10))) {
            return next(new Error('\'Mileage\' must be formatted to integer!'));
        }

        if (Number.isNaN(parseInt(req.body.price, 10))) {
            return next(new Error('\'Price\' must be formatted to integer!'));
        }

        res.locals.car.brand = req.body.brand;
        res.locals.car.year = parseInt(req.body.year, 10);
        res.locals.car.mileage = parseInt(req.body.mileage, 10);
        res.locals.car.price = parseInt(req.body.price, 10);
        res.locals.car.description = req.body.description;
        res.locals.car.owner = res.locals.user._id;

        res.locals.car.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/shop`);
        });
    };
};
