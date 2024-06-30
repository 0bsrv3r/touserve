const express  = require('express');
const router = express.Router();
const Review = require("../controllers/reviewController.js")
const reviewValidation  = require("../validators/review.js"); 

router.use(express.urlencoded({ extended:true }))

router.post('/tour/:id', reviewValidation, Review.tourReview)


module.exports = router