/**
 * If the user is logged in, redirects to /
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.session.userid !== 'undefined') {
            console.log("inverseAuth fail");
            return res.redirect('/');
        }
        console.log("inverseAuth passed");
        return next();
    };

};