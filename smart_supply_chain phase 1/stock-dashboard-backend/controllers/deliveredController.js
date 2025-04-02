import pool from '../config/db.js';

export const getDeliveredStocks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM delivered');
    res.json(result.rows);
  } catch (err) {
    console.error('Delivered Fetch Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
