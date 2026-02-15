const reviewModel = require("../models/review-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const reviewCont = {}

/* ***************************
 *  Process Review Submission
 * ************************** */
reviewCont.submitReview = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { inv_id, review_text, review_rating } = req.body
  const account_id = res.locals.accountData.account_id

  // Validate that user is logged in
  if (!account_id) {
    req.flash("notice", "You must be logged in to submit a review.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }

  // Add review to database
  const result = await reviewModel.addReview(
    inv_id,
    account_id,
    review_text,
    review_rating
  )

  if (result) {
    req.flash("notice", "Thank you! Your review has been submitted.")
    res.redirect(`/inv/detail/${inv_id}`)
  } else {
    req.flash("notice", "Sorry, there was an error submitting your review.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

/* ***************************
 *  Delete Review
 * ************************** */
reviewCont.deleteReview = async function (req, res, next) {
  const { review_id } = req.params
  const account_id = res.locals.accountData.account_id

  const result = await reviewModel.deleteReview(review_id, account_id)

  if (result) {
    req.flash("notice", "Your review has been deleted.")
  } else {
    req.flash("notice", "Sorry, we could not delete your review.")
  }
  
  res.redirect("/account/")
}

module.exports = reviewCont
