const express  = require('express');
const router = express.Router();
const Event = require("../controllers/eventController.js")
const Guide = require("../controllers/guideController.js")
const Tour = require("../controllers/tourController.js")

router.use(express.urlencoded({ extended:true }))

router.get('/', (req, res) => { 
    res.render("index", {layout: 'layouts/header'}); 
}); 

// Authentication
router.get('/register', (req, res) => { 
    res.render("register", { errors: {}, layout: false }); 
}); 

router.get('/login', (req, res) => { 
    res.render("login", { errors: {}, layout: false }); 
});

// Events
router.get('/events', Event.getEvents);

// Tours
router.get('/tours', Tour.getTours); 
router.get('/tour-details/:id', Tour.getTourById);

// Gudides
router.get('/guides', Guide.getGuides); 
router.get('/guide-details/:id', Guide.getGuideById);

// Photos
router.get('/photos', (req, res) => { 
    res.render("photos", {layout: 'layouts/pagesHeader'}); 
});

// E-Visa
router.get('/e-visa', (req, res) => { 
    res.render("e-visa", {layout: 'layouts/pagesHeader'}); 
});

module.exports = router;