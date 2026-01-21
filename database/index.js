const { Pool } = require("pg")
require("dotenv").config()

/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * And also needed for production on Render.com
 * If - else will determine logging vs direct pool export
 * *************** */
let pool

if (process.env.NODE_ENV === "development") {
  // Development: Local machine connecting to remote database
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000, // 10 seconds
    idleTimeoutMillis: 30000,
    max: 10
  })

  // Add error handling
  pool.on('error', (err) => {
    console.error('Unexpected database error:', err)
  })

  // Added for troubleshooting queries during development
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
  // Production: Render.com connecting to remote database
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 10
  })

  // Add error handling
  pool.on('error', (err) => {
    console.error('Unexpected database error:', err)
  })

  module.exports = pool
}