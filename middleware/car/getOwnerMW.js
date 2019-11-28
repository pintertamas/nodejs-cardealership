const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    return function (req, res, next) {
        const UserModel = requireOption(objectrepository, 'UserModel');

        return function(req, res, next) {

            UserModel.find({ _owner: soldcars._id }, (err, owner) => {
                if (err || !owner) {
                    return next(err);
                }

                res.locals.owners = owner;
                return next();
            });
        };
    };
};