const express  = require('express');
const router = express.Router();
const Customer = require("../controllers/profile/customerController.js")
const Tour = require("../controllers/profile/tourController.js")
const Accommadation = require("../controllers/profile/accommodationController.js")
const Guide = require("../controllers/profile/guideController.js")
const profileValidation  = require("../validators/image-update.js"); 
const customerValidation = require("../validators/customer-user-update.js")
const tourValidation  = require("../validators/tour.js"); 
const tourUpdateValidation  = require("../validators/tour-update.js"); 
const accommadationValidation  = require("../validators/accommodation.js"); 
const accommadationUpdateValidation  = require("../validators/accommodation-update.js"); 

router.use(express.urlencoded({ extended:true }))

router.get('/profile', Customer.getProfileInfo);
router.post('/profile/photo', profileValidation, Customer.uploadProfilePhoto);

// Update Personal Information
router.post('/update/email', customerValidation, Customer.updateEmail)
router.get('/verify/email', Customer.verifyEmail)
router.post('/update/number', customerValidation, Customer.updateNumber)
router.post('/update/password', customerValidation,  Customer.updatePassword)
router.post('/update/general', customerValidation,  Customer.updateGeneral)

// Tours
router.get('/tours/create', Tour.getTourCreate);
router.post('/tours/create', tourValidation, Tour.postTour);
router.get('/tours/update/:id', Tour.getUpdateTourById);
router.post('/tours/update/:id', tourUpdateValidation, Tour.postUpdateTourById);
router.get('/tour/delete/:id', Tour.deleteTourById);

// Accommodations
router.get('/accommodations/create', (req, res) => {res.render("./profile/accommodation-create", {layout: 'layouts/pagesheader', errors: {}, active:"accommodations" }); });
router.post('/accommodations/create', accommadationValidation, Accommadation.postAccommodation);
router.get('/accommodations/update/:id', Accommadation.getUpdateAccommodationById);
router.post('/accommodations/update/:id', accommadationUpdateValidation, Accommadation.postUpdateAccommodationById);
router.get('/accommodations/delete/:id', Accommadation.deleteAccommoditionById);

// Companies Guide
router.get('/guide/delete/:id', Guide.deleteCompanyGuide)

module.exports = router;