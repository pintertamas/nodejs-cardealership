/**
 * Using POST params update or save a user to the database
 * If res.locals.user is there, it's an update otherwise this middleware creates an entity
 * Redirects to / after success
 */

const requireOption = require('../requireOption');

/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        //lets find the user
        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {

            if ((err) || (result !== null)) {
                res.locals.error.push('Your email address is already registered!');
                return next();
            }

            if (req.body.name.length < 3) {
                res.locals.error.push('The username should be at least 3 characters!');
                return next();
            }

            //create user
            console.log("Creating new user");
            const newUser = new UserModel();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.save(function (err) {
                //redirect to /login
                console.log("Redirecting to /user/login");
                return res.redirect('/user/login');
            });
        });
    };
};