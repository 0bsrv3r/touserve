const express  = require('express');
const router = express.Router();
const Review = require("../controllers/reviewController.js")
const reviewValidation  = require("../validators/review.js"); 

router.use(express.urlencoded({ extended:true }))

router.post('/tour/:id', reviewValidation, Review.postTourReview)
router.get('/tour/delete/:id', Review.deleteTourReviewById)
router.post('/guide/:id', reviewValidation, Review.postGuideReview)
router.get('/guide/delete/:id', Review.deleteGuideReviewById)
router.post('/accommodation/:id', reviewValidation, Review.postAccommodationReview)
router.get('/accommodation/delete/:id', Review.deleteAccommodationReviewById)

module.exports = router