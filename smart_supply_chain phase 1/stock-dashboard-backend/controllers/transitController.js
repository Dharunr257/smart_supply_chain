import pool from '../config/db.js';

export const getTransitList = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        t.stock_id,
        t.stock_name,
        t.quantity,
        t.status,
        t.last_location_updated_at,
        t.moved_at,
        s.source_location,
        s.destination_location
      FROM transit_list t
      LEFT JOIN shipment_tracking s ON t.stock_id = s.stock_id
      ORDER BY t.moved_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
