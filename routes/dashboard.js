const express  = require('express');
const router = express.Router();
const Event = require("../controllers/eventController.js")
const Guide = require("../controllers/guideController.js")
const eventValidation  = require("../validators/event.js"); 
const guideValidation  = require("../validators/guide.js"); 

router.use(express.urlencoded({ extended:true }))

router.get('/', (req, res) => { 
    res.render("./dashboard/dashboard", {layout: 'layouts/dashboard/top-side-bars'}); 
});


// Events
router.get('/events', (req, res) => { 
    res.render("./dashboard/events", {layout: 'layouts/dashboard/top-side-bars', errors: {} }); 
});

router.post('/events',eventValidation, Event.postEvent);


// Guide
router.get('/guides', (req, res) => {
    res.render("./dashboard/guides", {layout: 'layouts/dashboard/top-side-bars', errors: {} }); 
});

router.post('/guides', guideValidation, Guide.postGuide);


// Tours
router.get('/tours', (req, res) => {
    res.render("./dashboard/tours", {layout: 'layouts/dashboard/top-side-bars', errors: {} }); 
});

module.exports = router;