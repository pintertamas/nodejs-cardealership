/**
 * Delete a car from the carList table using the :carid param
 * Adds the car to the soldCars table
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function(req, res, next) {
        const UserModel = requireOption(objectrepository, 'UserModel');

        if (typeof req.session.user === 'undefined') {
            console.log("req.session.user is undefined");
            return next();
        }

        UserModel.findOne({_id: req.session.user._id}, (err, user) => {
            if (err) {
                console.log("User not found");
                return next(err);
            }
            res.locals.user = user;
            res.locals.car._owner = user;
            res.locals.car.sold = true;
            console.log(res.locals.car._owner);
            res.locals.car.save();
            return res.redirect('/shop');
        });
    };
};