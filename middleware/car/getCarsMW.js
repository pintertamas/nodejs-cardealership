/**
 *load all cars from the db
 * the result is saved to res.locals.cars
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');

    return function(req, res, next) {
        CarModel.find({sold: false}, (err, cars) => {
            if (err) {
                return next(err);
            }

            res.locals.cars = cars;
            return next();
        });
    };
};
