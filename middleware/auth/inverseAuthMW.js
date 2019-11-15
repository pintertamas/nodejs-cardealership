/**
 * If the user is logged in, redirects to /
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof req.session.loggedIn !== 'undefined') {
            if (req.session.admin === true) {
                return res.redirect('/admin/carlist');
            }
            if (req.session.admin === false) {
                return res.redirect('/shop');
            }
            /*console.log("inverseAuth fail redirecting to / - body: " + req.body);
            return res.redirect('/logout');*/
        }
        console.log("inverseAuth passed");
        return next();
    };
};