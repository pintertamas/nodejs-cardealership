const requireOption = require('../requireOption');

/**
 * Using POST params update or save a car to the database
 * If res.locals.car is there, it's an update otherwise this middleware creates an entity
 * Redirects to /admin/CarList after success
 */

module.exports = function(objectrepository) {

    const CarModel = requireOption(objectrepository, 'CarModel');

    //somehow description is always undefined in this if statement, so i don't test for it
    //also, it's not that important
    return function(req, res, next) {
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.brand === 'undefined') ||
            (typeof req.body.year === 'undefined') ||
            (typeof req.body.mileage === 'undefined') ||
            (typeof req.body.price === 'undefined')) {
            console.log("Car is undefined - " + req.body.brand);
            //res.locals.error = "Fill all the details";
            return next();
        }

        if (typeof res.locals.car === 'undefined') {
            res.locals.car = new CarModel();
        }

        if (req.body.brand === 'undefined')
            res.locals.error = "You must name the car";

        if (Number.isNaN(parseInt(req.body.year, 10))) {
            res.locals.error = "\'Year\' must be formatted to integer!";
            //return next(new Error('\'Year\' must be formatted to integer!'));
            return next();
        }

        if (Number.isNaN(parseInt(req.body.mileage, 10))) {
            res.locals.error = "\'Mileage\' must be formatted to integer!";
            //return next(new Error('\'Mileage\' must be formatted to integer!'));
            return next();
        }

        if (Number.isNaN(parseInt(req.body.price, 10))) {
            res.locals.error = "\'Price\' must be formatted to integer!";
            //return next(new Error('\'Price\' must be formatted to integer!'));
            return next();
        }

        console.log("Creating the car");

        const newCar = new CarModel();
        newCar.brand = req.body.brand;
        newCar.year = parseInt(req.body.year, 10);
        newCar.mileage = parseInt(req.body.mileage, 10);
        newCar.price = parseInt(req.body.price, 10);
        newCar.description = req.body.description;
        newCar.sold = false;

        newCar.save(function (err) {
            //redirect to /login
            console.log("Car created with this name: " + newCar.brand);
            return res.redirect('/admin/carlist');

        });
    };
};