import bwipjs from 'bwip-js';
import fs from 'fs-extra';
import path from 'path';

export const generateBarcodeImage = async (stockId) => {
  const fileName = `${stockId}.jpeg`;
  const barcodePath = path.join('barcodes', fileName);
  const normalizedPath = path.posix.join('barcodes', fileName); // ✅ for response

  const buffer = await bwipjs.toBuffer({
    bcid: 'code128',
    text: stockId,
    scale: 3,
    height: 10,
    includetext: true,
  });

  await fs.ensureDir('barcodes');
  await fs.writeFile(barcodePath, buffer);

  return normalizedPath; // ✅ return web-friendly path
};
