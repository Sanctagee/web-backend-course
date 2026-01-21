/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
The codes I had before the guide, it uses ternary operator
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { 
        rejectUnauthorized: false
      } 
    : false,
  // Add these timeout settings:
  connectionTimeoutMillis: 10000, // 10 seconds
  idleTimeoutMillis: 30000,
  max: 10
});

// Add error handling
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

module.exports = pool;
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/


// ===== The guide I was expected to follow: it's a version that logs every database query to the terminal during development ====
const { Pool } = require("pg")
require("dotenv").config()
/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
let pool
if (process.env.NODE_ENV == "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
})

// Added for troubleshooting queries
// during development
module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("executed query", { text })
      return res
    } catch (error) {
      console.error("error in query", { text })
      throw error
    }
  },
}
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  module.exports = pool
}