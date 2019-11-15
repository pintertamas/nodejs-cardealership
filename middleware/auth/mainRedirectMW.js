/**
 * This middleware has one purpose, when the user visits the / main page,
 * should be redirected to
 *    - /user/login when not signed in
 *    - /shop when signed in
 */
module.exports = function () {
    return function (req, res) {

        if (typeof req.session.loggedIn === 'undefined') {
            console.log("session id:" + req.session.loggedIn);
            return res.redirect('/user/login');
        } else {
            if (req.session.admin === true) {
                console.log("session id:" + req.session.loggedIn);
                return res.redirect('/admin/carlist');
            }
            if (req.session.admin === false) {
                console.log("session id:" + req.session.loggedIn);
                return res.redirect('/shop');
            }
        }
    };
};