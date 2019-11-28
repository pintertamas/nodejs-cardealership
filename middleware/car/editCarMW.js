/**
 * edits the car
 */
const fs = require('fs');
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    return function(req, res, next) {
        if(
            typeof req.body.brand === 'undefined' ||
            typeof req.body.year === 'undefined' ||
            typeof req.body.mileage === 'undefined' ||
            typeof req.body.price === 'undefined'
        ) {
            console.log("Car is undefined in editcar");
            return next();
        }

        res.locals.car.brand = req.body.brand;
        res.locals.car.price = req.body.price;
        res.locals.car.year = req.body.year;
        res.locals.car.mileage = req.body.mileage;
        res.locals.car.description = req.body.description;

        if (typeof req.file === 'undefined') {
            // the picture will be the same
            console.log("Nothing changed");
        } else {
            fs.unlink(`public/uploads/${res.locals.car.path}.jpg`, (err) => {
                if (err) return next(err);
                console.log('successfully deleted ' + `public/uploads/${res.locals.car.path}.jpg`);
            });
            console.log(req.file);
            fs.rename(`public/uploads/${req.file.filename}`, `public/uploads/${req.file.filename}.jpg`, (err)=>{
                if (err) {
                    console.log(err);
                }
            });
            console.log("filename:" + req.file.filename);
            res.locals.car.path = req.file.filename;
        }

        res.locals.car.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/admin/carlist');
        });
    };
};
