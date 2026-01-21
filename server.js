/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

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

// Index route
app.get("/", baseController.buildHome)



// Index route
app.get("/", baseController.buildHome)


/* ***********************
 * Local Server Information
 * Values from .env (defaults in case .env is not working)
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})