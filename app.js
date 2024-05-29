const express = require('express'); 
const app = express(); 
const port = 8181; 

// dotenv 
require('dotenv').config();

// EJS for rendering pages
app.set("view engine", "ejs")

// EJS Layouts
const expressEjsLayouts = require("express-ejs-layouts"); 
app.use(expressEjsLayouts); 
app.set("layout", "layouts/header")
app.use('/upload', express.static('upload')); 

// express-session 
const session = require("express-session"); 
app.use(session({ 
        secret: process.env.SESSION_KEY,
        resave: false,  
        saveUninitialized: true, 
        cookie: { 
            secure: false   // set this to true in prod!!! 
        } 
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

// routes
const pathes = require ("./routes/path.js"); 
const auth = require ("./routes/auth.js"); 
const dashboard = require ("./routes/dashboard.js"); 
app.use("/", pathes);
app.use("/auth", auth);
app.use("/dashboard", /*login,*/ dashboard) // Checked with middleware if user registered or not.

// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).render('404', { layout: 'layouts/pagesheader', url: req.originalUrl });
});

app.listen(port, ()=>{ 
    console.log('Application is running on port 8181'); 
}) 