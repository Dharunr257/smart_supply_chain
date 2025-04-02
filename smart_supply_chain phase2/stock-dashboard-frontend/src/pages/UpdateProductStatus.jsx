import { useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import UpdateStatusForm from '../components/UpdateStatusForm';
import { updateProductStatus } from '../services/api';

const UpdateProductStatus = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const handleUpdate = async (formPayload) => {
    setMessage('');
    setError('');
    setData(null);

    const res = await updateProductStatus(formPayload); // 🔁 send full payload from form

    if (res?.data) {
      setMessage(res.message);
      setData(res.data);
    } else {
      setError(res?.message || 'Update failed. Check console or DB logs.');
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Update Product Status
      </Typography>

      <UpdateStatusForm onSubmit={handleUpdate} />

      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {data && (
        <Box sx={{ mt: 3 }}>
          <Typography><strong>Stock ID:</strong> {data.stock_id}</Typography>
          <Typography><strong>Product Name:</strong> {data.stock_name}</Typography>
          <Typography><strong>Quantity:</strong> {data.quantity}</Typography>
          <Typography><strong>Status:</strong> {data.status}</Typography>
          {data.moved_at && <Typography><strong>Moved At:</strong> {data.moved_at}</Typography>}
          {data.delivered_at && <Typography><strong>Delivered At:</strong> {data.delivered_at}</Typography>}
        </Box>
      )}
    </Box>
  );
};

export default UpdateProductStatus;
