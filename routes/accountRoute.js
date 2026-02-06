// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/account-validation")

// Route to deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to deliver registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Route to deliver account management view
router.get("/", utilities.handleErrors(accountController.buildAccountManagement))

// Process the Login Activity
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Export the router
module.exports = router;