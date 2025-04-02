import { Button, Typography, Grid, Paper, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import InventoryChart from "../components/InventoryChart";
import ForecastChart from "../components/ForecastChart";

import {
  getInventoryStats,
  getTransitStats,
  getDeliveredStats,
} from "../services/statsApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const [inventoryStats, setInventoryStats] = useState({
    total: 0,
    breakdown: [],
  });
  const [transitCount, setTransitCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);

  const fetchAllStats = async () => {
    const inv = await getInventoryStats();
    const transit = await getTransitStats();
    const delivered = await getDeliveredStats();

    setInventoryStats(inv);
    setTransitCount(transit.total);
    setDeliveredCount(delivered.total);
  };

  useEffect(() => {
    fetchAllStats();
    const interval = setInterval(fetchAllStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Smart Supply Chain Dashboard
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            my: 3,
          }}
        >
          <Button variant="contained" onClick={() => navigate("/inventory")}>
            Inventory List
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => navigate("/transit")}
          >
            Transit List
          </Button>
          <Button variant="outlined" onClick={() => navigate("/find-stock")}>
            Find Stock
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => navigate("/delivered")}
          >
            Delivered Items
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => navigate("/predict")}
          >
            Predict Inventory Needs
          </Button>
        </Box>

        {/* Stat Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatCard
              title="In Inventory"
              value={inventoryStats.total}
              icon={<InventoryIcon />}
              color="#1976d2"
              linkTo="/inventory"
              change={12}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="In Transit"
              value={transitCount}
              icon={<LocalShippingIcon />}
              color="#ffa000"
              linkTo="/transit"
              change={-5}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Delivered"
              value={deliveredCount}
              icon={<DoneAllIcon />}
              color="#43a047"
              linkTo="/delivered"
              change={4}
            />
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <InventoryChart breakdown={inventoryStats.breakdown} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <ForecastChart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Dashboard;
