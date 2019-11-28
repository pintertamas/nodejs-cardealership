/**
 * get all the sold cars from the db (a car is sold if the sold param is true)
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CarModel = requireOption(objectrepository, 'CarModel');

    return function(req, res, next) {

        CarModel.find({ sold: true }).populate("_owner").exec((err, soldcars) => {
            if (err || !soldcars) {
                return next(err);
            }

            res.locals.soldcars = soldcars;
            return next();
        });
    };
};