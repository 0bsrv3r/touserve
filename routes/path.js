const express  = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended:true }))

router.get('/', (req, res) => { 
    res.render("index", {layout: 'layouts/header'}); 
}); 

router.get('/register', (req, res) => { 
    res.render("register", { errors: {}, layout: false }); 
}); 

router.get('/login', (req, res) => { 
    res.render("login", { errors: {}, layout: false }); 
});

router.get('/events', (req, res) => { 
    res.render("events", {layout: 'layouts/pagesheader'}); 
}); 

module.exports = router;