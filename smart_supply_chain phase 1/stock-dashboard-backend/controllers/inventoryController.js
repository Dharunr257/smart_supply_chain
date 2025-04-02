import pool from '../config/db.js';

export const getInventory = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory_list');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


