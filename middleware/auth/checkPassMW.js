/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /shop
 * If the username is admin and the password is correct, redirect to /admin/carList
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {

        //check whether the user is the admin
        if ((req.body.email === "admin") && (req.body.password === "admin")) {
            return res.redirect('/admin');
        }

        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        //lets find the user
        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {
            if ((err) || (!result)) {
                res.locals.error.push('Your email address is not registered!');
                return next();
            }

            //check password
            if (result.password !== req.body.password) {
                res.locals.error.push('Wrong password!');
                return next();
            }

            //login is ok, save id to session
            req.session.userid = result._id;

            //redirect to / so the app can decide where to go next
            return res.redirect('/shop');
        });
    };
};