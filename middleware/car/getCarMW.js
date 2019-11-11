/**
 * Load a car from the database using the :carid param
 * The result is saved to res.locals.car
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');

    return function(req, res, next) {
        CarModel.findOne(
            {
                _id: req.params.carid
            },
            (err, car) => {
                if (err || !car) {
                    return next(err);
                }

                res.locals.car = car;
                return next();
            }
        );
    };
};