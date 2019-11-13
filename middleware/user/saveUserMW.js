/**
 * Using POST params update or save a user to the database
 * If res.locals.user is there, it's an update otherwise this middleware creates an entity
 * Redirects to / after success
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        //not enough parameter
        if ((typeof req.body.email === 'undefined') ||
            (typeof req.body.username === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            console.log("User is undefined");
            return next();
        }

        if (typeof res.locals.user === 'undefined') {
            res.locals.user = new UserModel();
        }

        res.locals.user.email = req.body.email;
        res.locals.user.username = req.body.username;
        res.locals.user.password = req.body.password;

        res.locals.user.save((err) => {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        });
    };
};