/**
 *load all users from the db
 * the result is saved to res.locals.users
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        UserModel.find((err, users) => {
            if (err) {
                return next(err);
            }

            res.locals.users = users;

            return next();
        });
    };
};
