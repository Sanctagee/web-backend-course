const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")
const utilities = require("../utilities")
const reviewValidate = require("../utilities/review-validation")

// Route to submit a review (POST)
router.post(
  "/submit",
  reviewValidate.reviewRules(),
  reviewValidate.checkReviewData,
  utilities.handleErrors(reviewController.submitReview)
)

// Route to delete a review
router.get(
  "/delete/:review_id",
  utilities.handleErrors(reviewController.deleteReview)
)

module.exports = router
