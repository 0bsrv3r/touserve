// app.use((req, res, next) => {
//     res.status(404).render('404', { url: req.originalUrl });
// });

function notFound(req, res, next) {
    if (res.statusCode == 404) {
            return res.redirect('/404');
    }
    next();
}

module.exports = notFound;