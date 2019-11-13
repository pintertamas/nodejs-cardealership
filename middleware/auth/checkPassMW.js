/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /shop
 * If the username is admin and the password is correct, redirect to /admin/carList
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {

        //not enough parameter
        if ((typeof req.body.email === 'undefined') ||
            (typeof req.body.username === 'undefined') ||
            (typeof req.body.password === 'undefined'))
        {
            console.log("User undefined in checkPassMW");
            return next();
        }

        //check whether the user is the admin
        if ((req.body.email === 'admin') && (req.body.password === 'admin')) {
            console.log("Yap, it's the admin");
            req.session.loggedIn = true;
            return req.session.save(err => res.redirect('/admin/carlist'));
        }

        //lets find the user
        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {
            if ((err) || (!result)) {
                console.log("Email not registered");
                res.locals.error.push('Your email address is not registered!');
                req.locals.loggedIn = false;
                return next();
            }

            //check password
            if (result.password !== req.body.password) {
                console.log("Wrong password");
                res.locals.error.push('Wrong password!');
                req.session.loggedIn = false;
                return next();
            }

            //login is ok, save id to session
            console.log("Created session");
            req.session.userid = result._id;
            req.session.loggedIn = true;

            //redirect to / so the app can decide where to go next
            return res.redirect('/shop');
        });
    };
};