// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId))

// Route to get inventory by classification (returns JSON) - for AJAX
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
)

// Route to build management view (Task 1) - requires Employee or Admin
router.get(
  "/", 
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildManagementView)
)

// Route to build add classification view (Task 2) - requires Employee or Admin
router.get(
  "/add-classification",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildAddClassification)
)

// Route to process add classification (Task 2) - requires Employee or Admin
router.post(
  "/add-classification",
  utilities.checkAccountType,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to build add inventory view (Task 3) - requires Employee or Admin
router.get(
  "/add-inventory",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildAddInventory)
)

// Route to process add inventory (Task 3) - requires Employee or Admin
router.post(
  "/add-inventory",
  utilities.checkAccountType,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Route to build inventory edit view - requires Employee or Admin
router.get(
  "/edit/:inv_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.editInventoryView)
)

// Process the update - requires Employee or Admin
router.post(
  "/update/",
  utilities.checkAccountType,
  invValidate.inventoryRules(), 
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Route to build delete confirmation view
router.get(
  "/delete/:inv_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteView)
)

// Process the delete
router.post(
  "/delete/",
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteInventory)
)

// Route to trigger intentional error (for testing error handling)
router.get("/trigger-error", utilities.handleErrors(invController.triggerError))

module.exports = router;