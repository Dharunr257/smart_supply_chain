import pool from '../config/db.js';

const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

export const updateProductStatusHandler = async (req, res) => {
  const { stock_id, new_status, source_location, destination_location } = req.body;

  try {
    if (new_status === 'in inventory') {
      const check = await pool.query('SELECT * FROM products WHERE stock_id = $1', [stock_id]);
      if (check.rows.length === 0) {
        return res.status(404).json({ message: 'Stock not found in products' });
      }

      const product = check.rows[0];

      await pool.query(
        `INSERT INTO inventory_list (stock_id, stock_name, quantity, status, moved_to_inventory_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [product.stock_id, product.product_name, product.quantity, 'in inventory', new Date()]
      );

      await pool.query('DELETE FROM products WHERE stock_id = $1', [stock_id]);

      return res.status(200).json({
        message: 'Stock moved to inventory_list',
        data: {
          stock_id,
          stock_name: product.product_name,
          quantity: product.quantity,
          status: 'in inventory',
        },
      });
    }

    if (new_status === 'in transit') {
      const alreadyExists = await pool.query(
        'SELECT 1 FROM transit_list WHERE stock_id = $1',
        [stock_id]
      );
      
      if (alreadyExists.rows.length > 0) {
        return res.status(400).json({
          message: 'Stock is already in transit_list. Cannot duplicate.'
        });
      }
      const check = await pool.query('SELECT * FROM inventory_list WHERE stock_id = $1', [stock_id]);
      if (check.rows.length === 0) {
        return res.status(404).json({ message: 'Stock not found in inventory_list' });
      }

      const item = check.rows[0];
      const moved_at = getCurrentTimestamp();
      const last_location_updated_at = moved_at;

      if (!source_location || !destination_location) {
        return res.status(400).json({ message: 'Source and destination are required' });
      }

      // Insert into transit_list
      await pool.query(
        `INSERT INTO transit_list (
          stock_id, stock_name, quantity, status,
          last_location_updated_at, moved_at, source_location, destination_location
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          item.stock_id,
          item.stock_name,
          item.quantity,
          'in transit',
          last_location_updated_at,
          moved_at,
          source_location,
          destination_location,
        ]
      );

      // Insert into shipment_tracking
      await pool.query(
        `INSERT INTO shipment_tracking (
          stock_id, stock_name, quantity, status,
          latitude, longitude, temperature, updated_at,
          in_transit_since, source_location, destination_location
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,NOW() - $9, $10, $11)`,
        [
          item.stock_id,
          item.stock_name,
          item.quantity,
          'in transit',
          0, 0, '25.0',
          moved_at,
          moved_at,
          source_location,
          destination_location,
        ]
      );

      await pool.query('DELETE FROM inventory_list WHERE stock_id = $1', [stock_id]);

      return res.status(200).json({
        message: 'Stock moved to transit_list with locations',
        data: {
          stock_id,
          stock_name: item.stock_name,
          quantity: item.quantity,
          status: 'in transit',
          moved_at,
          source_location,
          destination_location
        },
      });
    }

    if (new_status === 'delivered') {
      const check = await pool.query('SELECT * FROM transit_list WHERE stock_id = $1', [stock_id]);
      if (check.rows.length === 0) {
        return res.status(404).json({ message: 'Stock not found in transit_list' });
      }

      const item = check.rows[0];
      const delivered_at = getCurrentTimestamp();

      await pool.query(
        `INSERT INTO delivered (stock_id, stock_name, quantity, status, delivered_at, destination_location)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [item.stock_id, item.stock_name, item.quantity, 'delivered', delivered_at, item.destination_location]
      );

      await pool.query('DELETE FROM transit_list WHERE stock_id = $1', [stock_id]);

      return res.status(200).json({
        message: 'Stock marked as delivered',
        data: {
          stock_id,
          stock_name: item.stock_name,
          quantity: item.quantity,
          status: 'delivered',
          delivered_at,
          destination_location: item.destination_location
        },
      });
    }

    return res.status(400).json({ message: 'Invalid status update request' });
  } catch (err) {
    console.error('Update Status Error:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
