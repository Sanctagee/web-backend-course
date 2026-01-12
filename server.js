
/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.   Note that order of writing these code is very import
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const pool = require('./database/')


/* ***********************
 * Database Connection
 *************************/
app.use(async (req, res, next) => {
  try {
    // Test database connection
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    next(error);
  }
});


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

// Index route
app.get("/", function(req, res){
  res.render("index", {title: "Home"})
})

/* ***********************
 * Express Route for Home Page
 *************************/
// app.get("/", (req, res) => {
//   res.render("index", {
//     title: "Home Page - CSE 340",
//     message: "Welcome to CSE 340 Backend Development!"
//   });
// });

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

