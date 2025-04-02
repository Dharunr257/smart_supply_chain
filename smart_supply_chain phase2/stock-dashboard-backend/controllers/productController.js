import { v4 as uuidv4 } from 'uuid';
import { createProduct, getProductByStockId } from '../models/productModel.js';
import { generateBarcodeImage } from '../utils/generateBarcode.js';

export const createProductHandler = async (req, res) => {
  const { product_name, category, quantity } = req.body;
  const stock_id = `STK${uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase()}`;
  const status = 'manufactured';

  try {
    const barcode_path = await generateBarcodeImage(stock_id);
    const newProduct = await createProduct({
      stock_id,
      product_name,
      category,
      quantity,
      status,
      barcode_path,
    });

    res.status(201).json({
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};
