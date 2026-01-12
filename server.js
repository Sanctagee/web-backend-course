/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const app = express();
const static = require("./routes/static");

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* ***********************
 * Static Files Middleware
 *************************/
app.use(express.static('public'));

/* ***********************
 * Routes
 *************************/
app.use((req, res, next) => {
  // Set baseURL based on environment
  res.locals.baseURL = process.env.NODE_ENV === 'production' 
    ? 'https://web-backend-course.onrender.com'
    : 'http://localhost:5500';
  next();
});

app.use(static);

/* ***********************
 * Express Route for Home Page
 *************************/
app.get("/", function(req, res){
  res.render("index", {
    title: "Home",
    metaDescription: "Welcome to CSE Motors - Your trusted automotive partner"
  });
});

/* ***********************
 * Test route for Render
 *************************/
app.get("/render-test", function(req, res){
  res.send("Render deployment successful at: " + new Date().toISOString());
});

/* ***********************
 * Local Server Information
 * VALUES FROM .env OR DEFAULTS
 *************************/
const port = process.env.PORT || 5500;
const host = process.env.HOST || '0.0.0.0'; // CRITICAL: 0.0.0.0 for Render

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});