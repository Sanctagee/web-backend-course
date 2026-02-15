const { body, validationResult } = require("express-validator")
const utilities = require(".")

const validate = {}

/* ***************************
 *  Review Data Validation Rules
 * ************************** */
validate.reviewRules = () => {
  return [
    body("review_text")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Review must be at least 10 characters long."),

    body("review_rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Please select a rating from 1 to 5 stars."),

    body("inv_id")
      .isInt()
      .withMessage("Invalid vehicle ID.")
  ]
}

/* ***************************
 *  Check review data and return errors
 * ************************** */
validate.checkReviewData = async (req, res, next) => {
  const { inv_id, review_text, review_rating } = req.body
  let errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    req.flash("notice", "Please fix the errors in your review.")
    return res.redirect(`/inv/detail/${inv_id}`)
  }
  next()
}

module.exports = validate
