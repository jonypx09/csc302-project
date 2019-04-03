function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // res.sendStatus(401);
        res.redirect('/login');
    }
}

module.exports = {
    isLoggedIn: isLoggedIn
};