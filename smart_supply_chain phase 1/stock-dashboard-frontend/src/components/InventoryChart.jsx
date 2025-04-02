import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryChart = ({ breakdown }) => {
  const labels = breakdown.map(b => b.name);
  const dataValues = breakdown.map(b => b.count);

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Count',
        data: dataValues,
        backgroundColor: [
          '#1976d2',
          '#66bb6a',
          '#ef5350',
          '#ffa726',
          '#ab47bc',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ width: 400, mx: 'auto', mt: 3 }}>
      <Typography align="center" variant="h6" gutterBottom>
        Inventory Breakdown by Product Type
      </Typography>
      <Doughnut data={data} />
    </Box>
  );
};

export default InventoryChart;
