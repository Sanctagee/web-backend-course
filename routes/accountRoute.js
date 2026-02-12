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

// Logout route
router.get("/logout", utilities.handleErrors(accountController.logout))

// Route to deliver account management view
router.get(
  "/", 
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountManagement))

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

// Route to deliver account update view
router.get(
  "/update",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountUpdate)
)

// Process account info update
router.post(
  "/update-account",
  regValidate.accountUpdateRules(),
  regValidate.checkAccountUpdate,
  utilities.handleErrors(accountController.updateAccount)
)

// Process password update
router.post(
  "/update-password",
  regValidate.passwordUpdateRules(),
  regValidate.checkPasswordUpdate,
  utilities.handleErrors(accountController.updatePassword)
)

// Export the router
module.exports = router;