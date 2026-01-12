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