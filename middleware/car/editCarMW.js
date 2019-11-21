/**
 * edits a car
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');

    return function(req, res, next) {
        if (
            typeof req.body.brand === 'undefined' ||
            typeof req.body.year === 'undefined' ||
            typeof req.body.mileage === 'undefined' ||
            typeof req.body.price === 'undefined'
        ) {
            console.log("Car is undefined in editcar");
            return next();
        }

        if (typeof res.locals.car === 'undefined') {
            res.locals.car = new CarModel();
        }

        res.locals.car.brand = req.body.brand;
        res.locals.car.price = req.body.price;
        res.locals.car.year = req.body.year;
        res.locals.car.mileage = req.body.mileage;
        res.locals.car.description = req.body.description;


        res.locals.car.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/admin/cafrlist');
        });
    };
};
