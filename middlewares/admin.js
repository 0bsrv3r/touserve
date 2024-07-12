function adminAccess(req, res, next) {
    if (req.session.user_type !== "admin") {
            return res.redirect('/');
    }
    next();
}

module.exports = adminAccess;