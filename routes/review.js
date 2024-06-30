const express  = require('express');
const router = express.Router();
const Review = require("../controllers/reviewController.js")
const reviewValidation  = require("../validators/review.js"); 

router.use(express.urlencoded({ extended:true }))

router.post('/tour/:id', reviewValidation, Review.tourReview)
router.post('/guide/:id', reviewValidation, Review.guideReview)
router.post('/accommodation/:id', reviewValidation, Review.accommodationReview)

module.exports = router