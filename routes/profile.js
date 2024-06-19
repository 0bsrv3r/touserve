const express  = require('express');
const router = express.Router();
const Profile = require("../controllers/profile/profileController.js")
const Tour = require("../controllers/profile/tourController.js")
const Accommadation = require("../controllers/profile/accommodationController.js")
const guideValidation  = require("../validators/guide.js"); 
const guideUpdateValidation  = require("../validators/guide-update.js"); 
const tourValidation  = require("../validators/tour.js"); 
const tourUpdateValidation  = require("../validators/tour-update.js"); 
const accommadationValidation  = require("../validators/accommodation.js"); 
const accommadationUpdateValidation  = require("../validators/accommodation-update.js"); 

router.use(express.urlencoded({ extended:true }))

router.get('/', Profile.getYourData);

router.get('/tours/create', Tour.getTourCreate);


module.exports = router;