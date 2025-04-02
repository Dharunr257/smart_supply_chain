import { Box, TextField, Button, MenuItem } from '@mui/material';
import { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    product_name: '',
    category: '',
    quantity: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.product_name || !form.category || !form.quantity) return;
    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
      <TextField
        label="Product Name"
        name="product_name"
        value={form.product_name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
        required
      >
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Packaging">Packaging</MenuItem>
        <MenuItem value="Raw Material">Raw Material</MenuItem>
      </TextField>
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button variant="contained" type="submit">
        Create Product
      </Button>
    </Box>
  );
};

export default ProductForm;
