const pool = require("../database")

/* ***************************
 *  Add a new review
 * ************************** */
async function addReview(inv_id, account_id, review_text, review_rating) {
  try {
    const sql = `INSERT INTO review (inv_id, account_id, review_text, review_rating) 
                 VALUES ($1, $2, $3, $4) RETURNING *`
    const result = await pool.query(sql, [inv_id, account_id, review_text, review_rating])
    return result.rows[0]
  } catch (error) {
    console.error("addReview error: " + error)
    return null
  }
}

/* ***************************
 *  Get all reviews for a vehicle
 * ************************** */
async function getReviewsByInventoryId(inv_id) {
  try {
    const sql = `SELECT r.review_id, r.review_text, r.review_rating, r.review_date,
                 a.account_firstname, a.account_lastname
                 FROM review r
                 JOIN account a ON r.account_id = a.account_id
                 WHERE r.inv_id = $1
                 ORDER BY r.review_date DESC`
    const result = await pool.query(sql, [inv_id])
    return result.rows
  } catch (error) {
    console.error("getReviewsByInventoryId error: " + error)
    return []
  }
}

/* ***************************
 *  Get average rating for a vehicle
 * ************************** */
async function getAverageRating(inv_id) {
  try {
    const sql = `SELECT AVG(review_rating) as avg_rating, COUNT(*) as review_count
                 FROM review WHERE inv_id = $1`
    const result = await pool.query(sql, [inv_id])
    return result.rows[0]
  } catch (error) {
    console.error("getAverageRating error: " + error)
    return { avg_rating: 0, review_count: 0 }
  }
}

/* ***************************
 *  Get reviews by account (for user's profile)
 * ************************** */
async function getReviewsByAccountId(account_id) {
  try {
    const sql = `SELECT r.review_id, r.review_text, r.review_rating, r.review_date,
                 i.inv_make, i.inv_model, i.inv_year, i.inv_id
                 FROM review r
                 JOIN inventory i ON r.inv_id = i.inv_id
                 WHERE r.account_id = $1
                 ORDER BY r.review_date DESC`
    const result = await pool.query(sql, [account_id])
    return result.rows
  } catch (error) {
    console.error("getReviewsByAccountId error: " + error)
    return []
  }
}

/* ***************************
 *  Delete a review
 * ************************** */
async function deleteReview(review_id, account_id) {
  try {
    const sql = `DELETE FROM review WHERE review_id = $1 AND account_id = $2`
    const result = await pool.query(sql, [review_id, account_id])
    return result.rowCount > 0
  } catch (error) {
    console.error("deleteReview error: " + error)
    return false
  }
}

module.exports = {
  addReview,
  getReviewsByInventoryId,
  getAverageRating,
  getReviewsByAccountId,
  deleteReview
}
