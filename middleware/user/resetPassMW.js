/**
 * Using POST params update or save a user to the database
 * If res.locals.user is there, it sets up a new password for them, otherwise this middleware returns an error
 * Redirects to / after success
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        if (typeof req.body.email === 'undefined') {
            console.log("User is undefined in resetpass");
            return next();
        }

        UserModel.findOne({ email: req.body.email }, (err, user) => {
            if (err || !user) {
                console.log("Err");
                return next(err);
            }

            res.locals.user = user;
            user.password =  Math.random().toString(36).substring(2, 15);
            console.log("Pass: " + user.password);
            res.locals.error = "Your new password is: " + user.password;

            user.save(err => {
                if (err) {
                    return next(err);
                }
            });

            console.log(user);
            return next();
        });
    };
};

