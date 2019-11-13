const requireOption = require('../requireOption');

/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            console.log("User is undefined in checkUserLoginMW");
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
            console.log("login is ok, saving session");
            req.session.userid = result._id;

            //redirect to / so the app can decide where to go next
            return res.redirect('/');
        });
    };
};