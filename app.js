const express = require('express'); 
const app = express(); 
const port = 8181; 
 
// EJS for rendering pages
app.set("view engine", "ejs")

// EJS Layouts
const expressEjsLayouts = require("express-ejs-layouts"); 
app.use(expressEjsLayouts); 
app.set("layout", "layouts/header")
app.use('/upload', express.static('upload')); 

// routes
const pathes = require ("./routes/path.js"); 
const auth = require ("./routes/auth.js"); 
app.use("/", pathes);
app.use("/authentication", auth);

app.listen(port, ()=>{ 
    console.log('Application is running on port 8181'); 
}) 