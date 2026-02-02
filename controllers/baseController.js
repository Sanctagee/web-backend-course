const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  /*===================USED THESE TO TEST THE FLASH MESSAGES ==============

  // Test notice/info message
  req.flash("notice", "This is a flash message.")

  // Test warning message
  req.flash("warning", "Please review your information carefully.")

  // Test error message
  req.flash("error", "Something went wrong. Please try again.")

  // Test success message
    req.flash("success", "Operation completed successfully!")

   //=========================================================== */

  res.render("index", {title: "Home", nav})
}

module.exports = baseController