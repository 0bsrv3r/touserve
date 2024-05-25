const express  = require('express');
const router = express.Router();
const Event = require("../controllers/eventController.js")
const Guide = require("../controllers/guideController.js")

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

router.get('/guides', Guide.getGuides); 

router.get('/guide-details/:id', Guide.getGuideById);

router.get('/photos', (req, res) => { 
    res.render("photos", {layout: 'layouts/pagesHeader'}); 
});

router.get('/e-visa', (req, res) => { 
    res.render("e-visa", {layout: 'layouts/pagesHeader'}); 
});

module.exports = router;