const requireOption = require('../requireOption');

/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */
module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            console.log("User is undefined in checkUserRegistrationMW");
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

            if (req.body.name.length < 4) {
                res.locals.error.push('The username should be at least 4 characters!');
                return next();
            }

            //create user
            const newUser = new UserModel();
            newUser.email = req.body.email;
            newUser.username = req.body.username;
            newUser.password = req.body.password;
            newUser.save(function (err) {
                //redirect to /login
                console.log("User created with this name: " + newUser.username);
                console.log("Redirecting to /");
                return res.redirect('/login');
            });
        });
    };
};