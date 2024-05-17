function login(req, res, next) {
    if (!req.session.username) {
            return res.redirect('/');
    }
    next();
}

module.exports = login;