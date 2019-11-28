/**
 * Using POST params update or save a car to the database
 * If res.locals.car is there, it's an update otherwise this middleware creates an entity
 * Redirects to /admin/CarList after success
 */
const fs = require('fs');
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    const CarModel = requireOption(objectrepository, 'CarModel');

    return function(req, res, next) {
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.brand === 'undefined') ||
            (typeof req.body.year === 'undefined') ||
            (typeof req.body.mileage === 'undefined') ||
            (typeof req.body.price === 'undefined')) {
            console.log("Car is undefined - " + req.body.brand);
            return next();
        }

        if (typeof res.locals.car === 'undefined') {
            res.locals.car = new CarModel();
        }

        if (req.body.brand === 'undefined')
            res.locals.error = "You must name the car";

        if (Number.isNaN(parseInt(req.body.year, 10))) {
            res.locals.error = "\'Year\' must be formatted to integer!";
            return next();
        }

        if (Number.isNaN(parseInt(req.body.mileage, 10))) {
            res.locals.error = "\'Mileage\' must be formatted to integer!";
            return next();
        }

        if (Number.isNaN(parseInt(req.body.price, 10))) {
            res.locals.error = "\'Price\' must be formatted to integer!";
            return next();
        }

        // Set Storage Engine
        /*const storage = multer.diskStorage({
            destination: 'public/uploads',
            filename: "test"
        });

        // Init Upload
        const upload = multer({
            storage: storage,
            limits: {filesize: 5000000},
            fileFilter: function (req, file, cb) {
                checkFileType(file, cb);
            }
        }).single('image');

        module.exports = upload;

        upload(req, res, (err)=>{
            if (!err) {
                console.log("File: " + req.body.file);
            }
        });*/

        // Creating new car
        const newCar = new CarModel();
        newCar.brand = req.body.brand;
        newCar.year = parseInt(req.body.year, 10);
        newCar.mileage = parseInt(req.body.mileage, 10);
        newCar.price = parseInt(req.body.price, 10);
        newCar.description = req.body.description;
        newCar.sold = false;
        newCar.path = req.file.filename;
        fs.rename(`public/uploads/${req.file.filename}`, `public/uploads/${req.file.filename}.jpg`, (err)=>{
            if (err) {
                console.log(err);
            }
        });
        newCar.path = req.file.filename;
        console.log(req.file);

        // Saving the new car to the database
        newCar.save(function (err) {
            //redirect to /login
            console.log("This car was created: " + newCar);
            return res.redirect('/admin/carlist');
        });
    };
};