const express = require('express'); 
const session = require("cookie-session"); 
const app = express();  

// dotenv
require('dotenv').config();
const port = process.env.PORT || 8181;

// Disble X-Powered-By header
app.disable('x-powered-by')

// EJS for rendering pages
app.set("view engine", "ejs")

// EJS Layouts
const expressEjsLayouts = require("express-ejs-layouts"); 
app.use(expressEjsLayouts); 
app.set("layout", "layouts/header")
app.use('/upload', express.static('upload')); 

// cookie-session
app.use(session({ 
        secret: process.env.SESSION_KEY, 
        resave: false, 
        saveUninitialized: false, 
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
        }

        // name: 'session',
        // keys: ['key1', 'key2'],
        // maxAge: 24 * 60 * 60 * 1000, // 24 hours
        // domain: '.yourdomain.com', // Include leading dot for subdomains
        // path: '/', // Root path
        // secure: true, // Only send cookies over HTTPS
        // httpOnly: true, // Prevent client-side access to 
    }) 
) 

app.use((req, res, next) => { 
    res.locals.globalSession = req.session 
    next(); 
})

// file upload
const fileUpload = require("express-fileupload"); 
app.use(fileUpload())

// middlewares 
const login = require("./middlewares/auth.js")
const customerAccess = require("./middlewares/customer.js")
const adminAccess = require("./middlewares/admin.js")

// routes
const pathes = require ("./routes/path.js"); 
const auth = require ("./routes/auth.js"); 
const admin = require ("./routes/admin.js"); 
const customer = require ("./routes/customer.js"); 
const user = require ("./routes/user.js"); 
const review = require ("./routes/review.js"); 
const invitation = require ("./routes/invitation.js"); 
app.use("/", pathes);
app.use("/auth", auth);
app.use("/invitation", invitation)
app.use("/admin", adminAccess, admin)
app.use("/customer", customerAccess, customer)
app.use("/user", login, user)
app.use("/review", login, review)

// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).render('404', { layout: 'layouts/pagesheader', url: req.originalUrl, active:"404" });
});



app.listen(port, ()=>{ 
    console.log(`Application is running on port ${port}`); 
}) 