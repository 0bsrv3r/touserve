const express  = require('express');
const router = express.Router();
const Customer = require("../controllers/profile/customerController.js")
const Tour = require("../controllers/profile/tourController.js")
const Accommadation = require("../controllers/profile/accommodationController.js")
const profileValidation  = require("../validators/image-update.js"); 
const tourValidation  = require("../validators/tour.js"); 
const tourUpdateValidation  = require("../validators/tour-update.js"); 
const accommadationValidation  = require("../validators/accommodation.js"); 
const accommadationUpdateValidation  = require("../validators/accommodation-update.js"); 

router.use(express.urlencoded({ extended:true }))

router.get('/profile', Customer.getProfileInfo);
router.post('/profile/photo', profileValidation, Customer.uploadProfilePhoto);

// Tours
router.get('/tours/create', Tour.getTourCreate);
router.post('/tours/create', tourValidation, Tour.postTour);
router.get('/tours/update/:id', Tour.getUpdateTourById);
router.post('/tours/update/:id', tourUpdateValidation, Tour.postUpdateTourById);
router.get('/tour/delete/:id', Tour.deleteTourById);

// Accommodations
router.get('/accommodations/create', (req, res) => {res.render("./profile/accommodation-create", {layout: 'layouts/pagesheader', errors: {} }); });
router.post('/accommodations/create', accommadationValidation, Accommadation.postAccommodation);
router.get('/accommodations/update/:id', Accommadation.getUpdateAccommodationById);
router.post('/accommodations/update/:id', accommadationUpdateValidation, Accommadation.postUpdateAccommodationById);
router.get('/accommodations/delete/:id', Accommadation.deleteAccommoditionById);

module.exports = router;