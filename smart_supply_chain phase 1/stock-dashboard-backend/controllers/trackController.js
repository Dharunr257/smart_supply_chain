import pool from '../config/db.js';

export const trackStock = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT stock_id, stock_name, latitude, longitude, quantity, status, temperature,
              updated_at, in_transit_since, source_location, destination_location
       FROM shipment_tracking
       WHERE stock_id = $1
       ORDER BY updated_at DESC
       LIMIT 1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tracking data not found' });
    }

    const stock = result.rows[0];

    const formattedUpdatedAt = new Date(stock.updated_at).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    let inTransitText = 'N/A';
    if (stock.in_transit_since && typeof stock.in_transit_since === 'object') {
      const days = stock.in_transit_since.days ?? 0;
      const hours = stock.in_transit_since.hours ?? 0;
      const minutes = stock.in_transit_since.minutes ?? 0;
      inTransitText = `${days} day(s), ${hours} hr(s), ${minutes} min(s)`;
    }

    res.json({
      stock_id: stock.stock_id,
      stock_name: stock.stock_name,
      latitude: stock.latitude,
      longitude: stock.longitude,
      quantity: stock.quantity,
      status: stock.status,
      temperature: stock.temperature,
      updated_at: formattedUpdatedAt,
      in_transit_since: inTransitText,
      source_location: stock.source_location || null,
      destination_location: stock.destination_location || null,
    });
  } catch (err) {
    console.error('Tracking error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
