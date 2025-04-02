import pool from '../config/db.js';

export const findStock = async (req, res) => {
  const { id } = req.params;

  try {
    // Inventory
    const inventory = await pool.query('SELECT * FROM inventory_list WHERE stock_id = $1', [id]);
    if (inventory.rows.length) {
      const stock = inventory.rows[0];
      return res.json({
        location: 'inventory',
        data: {
          stock_id: stock.stock_id,
          stock_name: stock.stock_name,
          quantity: stock.quantity,
          status: stock.status,
        },
      });
    }

    // Transit
    // Transit
const transit = await pool.query('SELECT * FROM transit_list WHERE stock_id = $1', [id]);
if (transit.rows.length) {
  const stock = transit.rows[0];

  return res.json({
    location: 'transit',
    data: {
      stock_id: stock.stock_id,
      stock_name: stock.stock_name,
      quantity: stock.quantity,
      status: stock.status,
      last_location_updated_at: new Date(stock.last_location_updated_at).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      moved_at: new Date(stock.moved_at).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      source_location: stock.source_location,
      destination_location: stock.destination_location,
    },
  });
}


    // Delivered
    const delivered = await pool.query('SELECT * FROM delivered WHERE stock_id = $1', [id]);
    if (delivered.rows.length) {
      const stock = delivered.rows[0];
      return res.json({
        location: 'delivered',
        data: {
          stock_id: stock.stock_id,
          stock_name: stock.stock_name,
          quantity: stock.quantity,
          status: stock.status,
          delivered_at: new Date(stock.delivered_at).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        },
      });
    }

    res.status(404).json({ error: 'Stock not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
