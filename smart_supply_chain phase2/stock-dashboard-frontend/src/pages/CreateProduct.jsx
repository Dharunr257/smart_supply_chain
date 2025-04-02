import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ProductForm from '../components/ProductForm';
import BarcodePreview from '../components/BarcodePreview';
import { createProduct } from '../services/api';

const CreateProduct = () => {
  const [product, setProduct] = useState(null);

  const handleCreate = async (form) => {
    const result = await createProduct(form);
    if (result) {
      setProduct(result.data);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create New Product
      </Typography>
      {!product ? (
        <ProductForm onSubmit={handleCreate} />
      ) : (
        <BarcodePreview {...product} />
      )}
    </Box>
  );
};

export default CreateProduct;
