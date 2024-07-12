const express  = require('express');
const router = express.Router();
const Index = require("../controllers/indexController.js")
const Event = require("../controllers/admin/eventController.js")
const Guide = require("../controllers/profile/guideController.js")
const Tour = require("../controllers/profile/tourController.js");
const Accommadation = require("../controllers/profile/accommodationController.js");

router.use(express.urlencoded({ extended:true }))

router.get('/', Index.allServices); 

// Authentication
router.get('/register', (req, res) => { 
    res.render("register", { errors: {}, layout: false, registered:"" }); 
}); 

router.get('/login', (req, res) => { 
    res.render("login", { errors: {}, layout: false }); 
});

router.get('/adm/login', (req, res) => {
    res.render("./admin/login", {layout: false})
})

// Events
router.get('/events', Event.getEvents);

// Tours
router.get('/tours', Tour.getTours);
router.get('/tour-details/:id', Tour.getTourById);
router.get('/tours/:category', Tour.getTourByCategory);

// Accommodation
router.get('/accommodations', Accommadation.getAccommodations)
router.get('/accommodation-details/:id', Accommadation.getAccommodationById)

// Guides
router.get('/guides', Guide.getGuides); 
router.get('/guide-details/:id', Guide.getGuideById);

// Photos
router.get('/photos', (req, res) => { 
    res.render("photos", {layout: 'layouts/pagesHeader', active:"photos"}); 
});

// E-Visa
router.get('/e-visa', (req, res) => { 
    res.render("e-visa", {layout: 'layouts/pagesHeader', active:"e-visa"}); 
});

module.exports = router;