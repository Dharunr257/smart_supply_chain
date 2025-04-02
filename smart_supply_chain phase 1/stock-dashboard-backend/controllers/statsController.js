import pool from '../config/db.js';

// INVENTORY STATS
export const getInventoryStats = async (req, res) => {
  try {
    const totalRes = await pool.query('SELECT COUNT(*) FROM inventory_list');
    const breakdownRes = await pool.query(`
      SELECT stock_name, COUNT(*) as count
      FROM inventory_list
      GROUP BY stock_name
    `);

    res.json({
      total: parseInt(totalRes.rows[0].count),
      breakdown: breakdownRes.rows.map(row => ({
        name: row.stock_name,
        count: parseInt(row.count),
      })),
    });
  } catch (err) {
    console.error('Inventory stats error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// TRANSIT STATS
export const getTransitStats = async (req, res) => {
  try {
    const totalRes = await pool.query('SELECT COUNT(*) FROM transit_list');
    res.json({ total: parseInt(totalRes.rows[0].count) });
  } catch (err) {
    console.error('Transit stats error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELIVERED STATS
export const getDeliveredStats = async (req, res) => {
  try {
    const totalRes = await pool.query('SELECT COUNT(*) FROM delivered');
    res.json({ total: parseInt(totalRes.rows[0].count) });
  } catch (err) {
    console.error('Delivered stats error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
