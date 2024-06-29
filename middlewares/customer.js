function customerAccess(req, res, next) {
    if (req.session.user_type !== "customer") {
            return res.redirect('/');
    }
    next();
}

module.exports = customerAccess;