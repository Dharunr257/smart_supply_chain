import { useEffect, useState } from 'react';
import { getInventory } from '../services/api';
import Table from '../components/Table';
import { Box, TextField, Typography } from '@mui/material';
import Layout from '../components/Layout';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getInventory().then(setItems);
  }, []);

  const filtered = items.filter(item =>
    item.stock_id.toLowerCase().includes(search.toLowerCase()) ||
    item.stock_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Inventory List
        </Typography>
        <TextField
          fullWidth
          label="Search by Stock ID or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Table data={filtered} highlightId={null} />
      </Box>
    </Layout>
  );
};

export default Inventory;
