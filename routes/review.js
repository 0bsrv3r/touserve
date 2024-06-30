const express  = require('express');
const router = express.Router();
const Review = require("../controllers/reviewController.js")
// const profileValidation  = require("../validators/image-update.js"); 

router.use(express.urlencoded({ extended:true }))

router.post('/tour/:id', Review.tourReview)


module.exports = router