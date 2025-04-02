import { Box, Typography, Divider } from '@mui/material';

const BarcodePreview = ({ stock_id, product_name, category, quantity, status, barcode_path }) => {
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>✅ Product Created</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography><strong>Stock ID:</strong> {stock_id}</Typography>
      <Typography><strong>Name:</strong> {product_name}</Typography>
      <Typography><strong>Category:</strong> {category}</Typography>
      <Typography><strong>Quantity:</strong> {quantity}</Typography>
      <Typography><strong>Status:</strong> {status}</Typography>
      <Box
        component="img"
        src={`http://localhost:5001/${barcode_path}`}
        alt="Generated Barcode"
        sx={{ mt: 2, width: 300 }}
      />
    </Box>
  );
};

export default BarcodePreview;
