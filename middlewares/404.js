function notFound(req, res, next) {
    if (res.statusCode == 404) {
            return res.redirect('/404');
    }
    next();
}

module.exports = notFound;