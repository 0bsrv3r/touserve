const express  = require('express');
const router = express.Router();
const Event = require("../controllers/eventController.js")
const Guide = require("../controllers/guideController.js")
const Tour = require("../controllers/tourController.js")
const Accommadation = require("../controllers/accommodationController.js")
const eventValidation  = require("../validators/event.js"); 
const guideValidation  = require("../validators/guide.js"); 
const tourValidation  = require("../validators/tour.js"); 
const accommadationValidation  = require("../validators/accommodation.js"); 

router.use(express.urlencoded({ extended:true }))

router.get('/', (req, res) => { 
    res.render("./dashboard/dashboard", {layout: 'layouts/dashboard/top-side-bars'}); 
});


// Events
router.get('/events', Event.getEventsByUserId);
router.post('/events', eventValidation, Event.postEvent);
router.get('/events/delete/:id', Event.deleteEventById);

// Guide
router.get('/guides', (req, res) => {
    res.render("./dashboard/guides", {layout: 'layouts/dashboard/top-side-bars', errors: {} }); 
});
router.post('/guides', guideValidation, Guide.postGuide);

// Tours
router.get('/tours', Tour.getGuideName);
router.post('/tours', tourValidation, Tour.postTour);

// Accommadation
router.get('/accommodations', (req, res) => {
    res.render("./dashboard/accommodations", {layout: 'layouts/dashboard/top-side-bars', errors: {} }); 
});
router.post("/accommodations", accommadationValidation, Accommadation.postAccommodation)

module.exports = router;