const express  = require('express');
const router = express.Router();
const Event = require("../controllers/eventController.js")
const Guide = require("../controllers/guideController.js")
const Tour = require("../controllers/tourController.js")
const Accommadation = require("../controllers/accommodationController.js")
const eventValidation  = require("../validators/event.js"); 
const guideValidation  = require("../validators/guide.js"); 
const guideUpdateValidation  = require("../validators/guide-update.js"); 
const tourValidation  = require("../validators/tour.js"); 
const tourUpdateValidation  = require("../validators/tour-update.js"); 
const accommadationValidation  = require("../validators/accommodation.js"); 
const accommadationUpdateValidation  = require("../validators/accommodation-update.js"); 

router.use(express.urlencoded({ extended:true }))

router.get('/', (req, res) => { 
    res.render("./dashboard/dashboard", {layout: 'layouts/dashboard/top-side-bars'}); 
});


// Events
router.get('/events', Event.getEventsByUserId);
router.get('/events/create', (req,res) => {
    res.render("./dashboard/events-create", {layout: 'layouts/dashboard/top-side-bars', errors: {}});
});
router.post('/events/create', eventValidation, Event.postEvent);
router.get('/events/update/:id', Event.getUpdateEventById);
router.post('/events/update/:id', eventValidation, Event.postUpdateEventById);
router.get('/events/delete/:id', Event.deleteEventById);


// Guide
router.get('/guides', Guide.getGuidesByUserId);
router.get('/guides/create', (req,res) => {
    res.render("./dashboard/guides-create", {layout: 'layouts/dashboard/top-side-bars', errors: {}});
});
router.post('/guides/create', guideValidation, Guide.postGuide);
router.get('/guides/update/:id', Guide.getUpdateGuideById);
router.post('/guides/update/:id', guideUpdateValidation, Guide.postUpdateGuideById);
router.get('/guides/delete/:id', Guide.deleteGuideById);

// Tours
router.get('/tours', Tour.getToursByUserId);
router.get('/tours/create', Tour.getGuideName);
router.post('/tours/create', tourValidation, Tour.postTour);
router.get('/tours/update/:id', Tour.getUpdateTourById);
router.post('/tours/update/:id', tourUpdateValidation, Tour.postUpdateTourById);
router.get('/tours/delete/:id', Tour.deleteTourById);


// Accommadation
router.get('/accommodations', Accommadation.getAccommodationsByUserId);
router.get('/accommodations/create', (req, res) => {
    res.render("./dashboard/accommodations-create", {layout: 'layouts/dashboard/top-side-bars', errors: {} }); 
});
router.post("/accommodations/create", accommadationValidation, Accommadation.postAccommodation)
router.get('/accommodations/update/:id', Accommadation.getUpdateAccommodationById);
router.post('/accommodations/update/:id', accommadationUpdateValidation, Accommadation.postUpdateAccommodationById);
router.get('/accommodations/delete/:id', Accommadation.deleteAccommoditionById);


module.exports = router;