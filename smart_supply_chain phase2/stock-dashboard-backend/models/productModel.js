import pool from '../config/db.js';

export const createProduct = async (product) => {
  const { stock_id, product_name, category, quantity, status, barcode_path } = product;
  const query = `
    INSERT INTO products (stock_id, product_name, category, quantity, status, barcode_path)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [stock_id, product_name, category, quantity, status, barcode_path];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const updateProductStatus = async (stock_id, newStatus) => {
  const query = `
    UPDATE products
    SET status = $1
    WHERE stock_id = $2
    RETURNING *;
  `;
  const values = [newStatus, stock_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getProductByStockId = async (stock_id) => {
  const query = `
    SELECT * FROM products
    WHERE stock_id = $1;
  `;
  const { rows } = await pool.query(query, [stock_id]);
  return rows[0];
};
