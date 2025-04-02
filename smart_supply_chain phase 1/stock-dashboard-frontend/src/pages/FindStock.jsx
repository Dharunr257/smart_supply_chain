import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import Layout from "../components/Layout";
import Toast from "../components/Toast";
import { findStock, trackStock } from "../services/api";
import LiveMap from "../components/LiveMap";

const FindStock = () => {
  const [stockId, setStockId] = useState("");
  const [stockData, setStockData] = useState(null);
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSearch = async () => {
    setLoading(true);
    console.log("[FindStock] Searching for:", stockId);

    const result = await findStock(stockId);
    if (!result) {
      setToast({ open: true, message: "Stock not found", severity: "error" });
      setLoading(false);
      return;
    }

    console.log("[FindStock] Found stock data:", result);
    setStockData(result);
    setToast({
      open: true,
      message: `Stock found in ${result.location}`,
      severity: "success",
    });

    if (result.location === "transit") {
      const tracking = await trackStock(stockId);
      console.log("[FindStock] Tracking data:", tracking);
      setTrackData(tracking);
    } else {
      setTrackData(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    let interval;
    if (stockData?.location === "transit") {
      interval = setInterval(async () => {
        const tracking = await trackStock(stockId);
        console.log("[FindStock] Tracking data:", tracking);
        setTrackData(tracking);
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [stockData, stockId]);

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Find Stock
        </Typography>
        <TextField
          label="Enter Stock ID"
          value={stockId}
          onChange={(e) => setStockId(e.target.value)}
          sx={{ mr: 2, mb: 2 }}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>

        {loading && <CircularProgress sx={{ mt: 2 }} />}

        {(stockData?.location === "inventory" ||
          stockData?.location === "delivered") && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h6">{stockData.data.stock_name}</Typography>
            <Typography>Stock ID: {stockData.data.stock_id}</Typography>
            <Typography>Quantity: {stockData.data.quantity}</Typography>
            {stockData.data.status && (
              <Typography>Status: {stockData.data.status}</Typography>
            )}
            {stockData.data.delivered_at && (
              <Typography>
                Delivered At: {stockData.data.delivered_at}
              </Typography>
            )}
          </Box>
        )}

        {stockData?.location === "transit" && trackData && (
          <>
            <LiveMap
              lat={trackData.latitude}
              lng={trackData.longitude}
              source={trackData.source_location}
              destination={trackData.destination_location}
            />
            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "background.paper",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6">{stockData.data.stock_name}</Typography>
              <Typography>Stock ID: {stockData.data.stock_id}</Typography>
              <Typography>Quantity: {stockData.data.quantity}</Typography>
              <Typography>Status: {stockData.data.status}</Typography>
              <Typography>Moved At: {stockData.data.moved_at}</Typography>
              <Typography>
                Last Location Updated: {stockData.data.last_location_updated_at}
              </Typography>
              <Typography>Temperature: {trackData.temperature}°C</Typography>
              <Typography>Last Updated: {trackData.updated_at}</Typography>
              <Typography>
                In Transit Since: {trackData.in_transit_since}
              </Typography>
              <Typography>
                Route: {trackData.source_location} →{" "}
                {trackData.destination_location}
              </Typography>
            </Box>
          </>
        )}

        <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
        />
      </Container>
    </Layout>
  );
};

export default FindStock;
