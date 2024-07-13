const express  = require('express');
const router = express.Router();
const Event = require("../controllers/admin/eventController.js")
const Tour = require("../controllers/admin/tourController.js")
const Accommadation = require("../controllers/admin/accommodationController.js")
const eventValidation  = require("../validators/event.js"); 
const tourValidation  = require("../validators/tour.js"); 
const tourUpdateValidation  = require("../validators/tour-update.js"); 
const accommadationValidation  = require("../validators/accommodation.js"); 
const accommadationUpdateValidation  = require("../validators/accommodation-update.js"); 

router.use(express.urlencoded({ extended:true }))

// Dashboard
router.get('/', (req, res) => {res.render("./admin/admin", {layout: 'layouts/admin/top-side-bars'})});

// Events
router.get('/events', Event.getEventsByUserId);
router.get('/events/create', (req,res) => {res.render("./admin/events-create", {layout: 'layouts/admin/top-side-bars', errors: {}});});
router.post('/events/create', eventValidation, Event.postEvent);
router.get('/events/update/:id', Event.getUpdateEventById);
router.post('/events/update/:id', eventValidation, Event.postUpdateEventById);
router.get('/events/delete/:id', Event.deleteEventById);

// Tours
router.get('/tours', Tour.getToursByUserId);
router.get('/tours/create', Tour.getTourCreate);
router.post('/tours/create', tourValidation, Tour.postTour);
router.get('/tours/update/:id', Tour.getUpdateTourById);
router.post('/tours/update/:id', tourUpdateValidation, Tour.postUpdateTourById);
router.get('/tours/delete/:id', Tour.deleteTourById);

// Accommadations
router.get('/accommodations', Accommadation.getAccommodationsByUserId);
router.get('/accommodations/create', (req, res) => {res.render("./admin/accommodations-create", {layout: 'layouts/admin/top-side-bars', errors: {} }); });
router.post("/accommodations/create", accommadationValidation, Accommadation.postAccommodation)
router.get('/accommodations/update/:id', Accommadation.getUpdateAccommodationById);
router.post('/accommodations/update/:id', accommadationUpdateValidation, Accommadation.postUpdateAccommodationById);
router.get('/accommodations/delete/:id', Accommadation.deleteAccommoditionById);

module.exports = router;