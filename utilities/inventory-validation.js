const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const invModel = require("../models/inventory-model")

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    // classification_name is required and must not contain spaces or special characters
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name.")
      .matches(/^[A-Za-z0-9]+$/)
      .withMessage("Classification name cannot contain spaces or special characters.")
      .custom(async (classification_name) => {
        const classificationExists = await invModel.checkExistingClassification(classification_name)
        if (classificationExists) {
          throw new Error("Classification already exists. Please use a different name.")
        }
      }),
  ]
}

/* ******************************
 * Check classification data and return errors or continue
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
  return [
    // Make is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a make (minimum 3 characters)."),

    // Model is required and must be string
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a model (minimum 3 characters)."),

    // Year is required and must be 4 digits
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 4, max: 4 })
      .withMessage("Year must be exactly 4 digits.")
      .matches(/^\d{4}$/)
      .withMessage("Year must be 4 digits."),

    // Description is required
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage("Please provide a description (minimum 10 characters)."),

    // Image path is required
    body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Please provide an image path."),

    // Thumbnail path is required
    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Please provide a thumbnail path."),

    // Price is required and must be a number
    body("inv_price")
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage("Please provide a valid price (numbers only).")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),

    // Miles is required and must be an integer
    body("inv_miles")
      .trim()
      .notEmpty()
      .isInt({ min: 0 })
      .withMessage("Please provide valid miles (whole numbers only, no commas)."),

    // Color is required
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a color (minimum 2 characters)."),

    // Classification ID is required and must be a number
    body("classification_id")
      .trim()
      .notEmpty()
      .isInt()
      .withMessage("Please select a valid classification."),
  ]
}

/* ******************************
 * Check inventory data and return errors or continue
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  } = req.body
  
  let errors = []
  errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors or continue to update
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { inv_id, inv_make, inv_model } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList(req.body.classification_id)
    const itemName = `${inv_make} ${inv_model}`
    res.render("inventory/edit-inventory", {
      errors,
      title: "Edit " + itemName,
      nav,
      classificationSelect,
      inv_id,
      inv_make,
      inv_model,
      inv_year: req.body.inv_year,
      inv_description: req.body.inv_description,
      inv_image: req.body.inv_image,
      inv_thumbnail: req.body.inv_thumbnail,
      inv_price: req.body.inv_price,
      inv_miles: req.body.inv_miles,
      inv_color: req.body.inv_color,
      classification_id: req.body.classification_id
    })
    return
  }
  next()
}

module.exports = validate