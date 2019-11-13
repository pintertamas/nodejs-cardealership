/**
 * This middleware has one purpose, when the user visits the / main page,
 * should be redirected to
 *    - /user/login when not signed in
 *    - /shop when signed in
 */
module.exports = function () {
    return function (req, res) {

        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/user/login');
        } else {
            return res.redirect('/shop');
        }
    };
};