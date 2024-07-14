function customerAccess(req, res, next) {
    console.log(1)
    console.log(req.session.user_type)
    if (req.session.user_type !== "customer") {
            return res.redirect('/');
    }
    next();
}

module.exports = customerAccess;