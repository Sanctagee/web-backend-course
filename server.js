/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const session = require("express-session")
const pool = require('./database/')
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")
const utilities = require("./utilities/") 
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const reviewRoute = require("./routes/reviewRoute")

/* ***********************
 * View Engine and Templates
 *************************/

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")


/* ***********************
 * Middlewares
 * Session Id   
 * ************************/
 app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))


// Express Messages Middleware
// Between the request and response
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Login Activity
app.use(cookieParser())

// Login Process Activity
app.use(utilities.checkJWTToken)




/* ***********************
 * Routes
 *************************/
app.use(static)

// Middleware to set baseURL for all views
app.use((req, res, next) => {
  res.locals.baseURL = process.env.NODE_ENV === 'production' 
    ? 'https://web-backend-course.onrender.com'
    : 'http://localhost:5500'
  next()
})
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*
// Temporary placeholder route for vehicle classifications, seen by clicking the nav options
app.get("/inv/type/:classificationId", (req, res) => {
  res.send(`
    <h1>Vehicle Classification View</h1>
    <p>You requested classification ID: ${req.params.classificationId}</p>
    <p>This route will be fully implemented in the next activity.</p>
    <a href="/">← Back to Home</a>
  `)
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/


// Index route
app.get("/", baseController.buildHome)

// Inventory routes
app.use("/inv", inventoryRoute)

// Account route
app.use("/account", accountRoute)

// Review route
app.use("/review", reviewRoute)

/* ***********************
 * File Not Found (404) Handler
 * Must be after all other routes
 *************************/
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
 * Express Error Handler
 * Placed after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  let message
  if(err.status == 404){ 
    message = err.message
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?'
  }
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})


/* ***********************
 * Local Server Information
 * Values from .env (defaults in case .env is not working)
 *************************/
const port = process.env.PORT || 5500
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, host, () => {
  console.log(`app listening on ${host}:${port}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})