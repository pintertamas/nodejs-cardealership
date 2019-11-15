const requireOption = require('../requireOption');

/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.name === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            console.log("checkUserRegistrationMW " + req.body);
            return next();
        }

        if (req.body.name === "admin" || req.body.password === "admin" || req.body.email === "admin") {
            console.log("error, you cant be admin :(");
            return next();
        }

        //lets find the user
        UserModel.findOne({
            name: req.body.name
        }, function (err, result) {

            if ((err) || (result !== null)) {
                //res.locals.error.push('This username has already been registered!');
                return next();
            }

            if (req.body.name.length < 4) {
                //res.locals.error.push('The name should be at least 4 characters!');
                return next();
            }

            //create user
            const newUser = new UserModel();
            newUser.email = req.body.email;
            newUser.name = req.body.name;
            newUser.password = req.body.password;
            newUser.save(function (err) {
                //redirect to /login
                console.log("User created with this name: " + newUser.name);
                console.log("Redirecting to /");
                return res.redirect('/');
            });
        });
    };
};