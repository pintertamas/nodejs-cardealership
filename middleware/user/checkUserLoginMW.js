const requireOption = require('../requireOption');

/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {

        //check if the user is the admin
        if (req.body.name === "admin" && req.body.password === "admin") {
            console.log("The admin's here");
            req.session.loggedIn = req.sessionID;
            req.session.admin = true;
            return res.redirect('/admin/carlist');
        }

        //not enough parameter
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            console.log("checkUserLoginMW - body: " + req.body);
            return next();
        }

        //lets find the user
        UserModel.findOne({
            name: req.body.name
        }, function (err, result) {
            if ((err) || (!result)) {
                res.locals.error = 'Your name is not registered!';
                console.log("Your name is not registered!");
                return next();
            }

            //check password
            if (result.password !== req.body.password) {
                res.locals.error = 'Wrong password!';
                console.log("Wrong password!");
                return next();
            }

            //login is ok, save id to session
            console.log("login is ok, saving session");
            req.session.loggedIn = req.sessionID;
            req.session.admin = false;

            //redirect to / so the app can decide where to go next
            return res.redirect('/shop');
        });
    };
};