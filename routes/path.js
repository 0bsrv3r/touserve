const express  = require('express');
const router = express.Router();
const Event = require("../controllers/eventController")

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

router.get('/events', Event.getEvents); 

router.get('/photos', (req, res) => { 
    res.render("photos", {layout: 'layouts/pagesHeader'}); 
});

module.exports = router;