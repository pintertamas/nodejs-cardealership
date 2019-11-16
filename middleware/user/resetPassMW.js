/**
 * Using POST params update or save a user to the database
 * If res.locals.user is there, it sets up a new password for them, otherwise this middleware returns an error
 * Redirects to / after success
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        //not enough parameter
        if (typeof(req.body.email) === 'undefined') {
            res.locals.error = "Undefined";
            return next();
        }


        UserModel.findOne({ _id: req.params.userid }, (err, user) => {
            if (err || !user) {
                res.locals.error = "Error, couldn't find email";
                return next(err);
            }

            console.log("Resetting pass");
            res.locals.error = "Password is reset";
            user.password = "newpass";
            res.locals.user = user;
            console.log("New pass: " + user.password);
            res.locals.error = "New password: " + user.password;

            user.save((err)=>{
                console.log("Error: " + err);
            });
            console.log("User: " + user);
            return next((err)=>{
                console.log(err);
            });
        });
    };
};
