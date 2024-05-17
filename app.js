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

// routes
const pathes = require ("./routes/path.js"); 
const auth = require ("./routes/auth.js"); 
const dashboard = require ("./routes/dashboard.js"); 
app.use("/", pathes);
app.use("/auth", auth);
app.use("/dashboard", dashboard)

app.listen(port, ()=>{ 
    console.log('Application is running on port 8181'); 
}) 