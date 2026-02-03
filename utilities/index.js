const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * To create the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = `<ul id="nav-menu">`
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* To build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* To build the vehicle detail HTML
* ************************************ */
Util.buildVehicleDetail = async function(vehicle){
  let detail = '<div class="vehicle-detail-container">'
  detail += '<div class="vehicle-detail-content">'
  
  // Vehicle Image
  detail += '<div class="vehicle-detail-image">'
  detail += '<img src="' + vehicle.inv_image + '" alt="' + vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model + '">'
  detail += '</div>'
  
  // Vehicle Information
  detail += '<div class="vehicle-detail-info">'
  detail += '<h2 class="vehicle-name">' + vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h2>'
  detail += '<p class="vehicle-price">$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</p>'
  
  detail += '<div class="vehicle-specs">'
  detail += '<div class="spec-item">'
  detail += '<span class="spec-label">Mileage:</span>'
  detail += '<span class="spec-value">' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + ' miles</span>'
  detail += '</div>'
  
  detail += '<div class="spec-item">'
  detail += '<span class="spec-label">Color:</span>'
  detail += '<span class="spec-value">' + vehicle.inv_color + '</span>'
  detail += '</div>'
  detail += '</div>'
  
  detail += '<div class="vehicle-description">'
  detail += '<h3>Description</h3>'
  detail += '<p>' + vehicle.inv_description + '</p>'
  detail += '</div>'
  
  detail += '</div>'
  detail += '</div>' 
  detail += '</div>' 
  
  return detail
}


/* ****************************************
 * Build classification list for select dropdown (Task 3)
 * **************************************** */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util





module.exports = Util