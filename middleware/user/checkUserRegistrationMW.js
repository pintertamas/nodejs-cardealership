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
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.name === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        if (req.body.name === "admin") {
            res.locals.error = "This username or email is not allowed!";
            return next();
        }

        //lets find the user
        UserModel.findOne({
            name: req.body.name
        }, function (err, result) {

            if ((err) || (result !== null)) {
                //res.locals.error.push('This username has already been registered!');
                console.log("This username is already in use");
                res.locals.error = "This username is already in use";
                return next();
            }

            if (req.body.email.length < 4) {
                //res.locals.error.push('The name should be at least 4 characters!');
                console.log("The email should be at least 4 characters!");
                res.locals.error = "The email should be at least 4 characters long!";
                return next();
            }

            if (req.body.name.length < 4) {
                //res.locals.error.push('The name should be at least 4 characters!');
                console.log("The name should be at least 4 characters!");
                res.locals.error = "The name should be at least 4 characters long!";
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
                console.log("Redirecting to /shop, creating session");
                req.session.loggedIn = req.sessionID;
                req.session.admin = false;
                return res.redirect('/shop');
            });
        });
    };
};