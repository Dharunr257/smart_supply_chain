import { useEffect, useState } from 'react';
import { getForecast } from '../services/statsApi';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const getRandomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

const ForecastChart = () => {
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    try {
      const raw = await getForecast();

      if (!raw || typeof raw !== 'object') return;

      const labels = Object.keys(Object.values(raw).find(v => typeof v === 'object') || {});

      const datasets = Object.entries(raw)
        .filter(([, value]) => typeof value === 'object')
        .map(([stockName, forecast]) => ({
          label: stockName,
          data: labels.map(month => forecast[month] || 0),
          backgroundColor: getRandomColor(),
        }));

      setChartData({ labels, datasets });
    } catch (error) {
      console.error('Error fetching forecast data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mt: 6, maxWidth: '1000px', mx: 'auto' }}>
      <Typography variant="h6" align="center" gutterBottom>
        📊 Predicted Inventory Demand (Next 3 Months)
      </Typography>

      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              tooltip: { mode: 'index', intersect: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Quantity',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Month',
                },
              },
            },
          }}
        />
      ) : (
        <Typography align="center" color="text.secondary">
          Loading forecast data...
        </Typography>
      )}
    </Box>
  );
};

export default ForecastChart;
