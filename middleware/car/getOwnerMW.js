const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
            const ownerId = req.query.ownerId;
            UserModel.findById(ownerId).populate("_owner").exec(function(err, owner) {
                if(err){
                    console.log(err);
                } else {
                    console.log(owner);
                    res.render("./player/resultTeam", {teams: owner });
                }
            });
            return next();
    };
};
