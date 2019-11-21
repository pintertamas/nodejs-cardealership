// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log("sessionChecker -> /");
        return res.redirect('/');
    } else {
        return next();
    }
};