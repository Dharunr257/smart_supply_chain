import { useEffect, useState } from "react";
import { Typography, Paper, Box } from "@mui/material";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { getTransitList } from "../services/api";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const TransitList = () => {
  const [rows, setRows] = useState([]);

  const fetchTransit = async () => {
    try {
      const data = await getTransitList();
      setRows(data);
    } catch (err) {
      console.error("Error loading transit list:", err.message);
    }
  };

  useEffect(() => {
    fetchTransit();
    const interval = setInterval(fetchTransit, 5000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    { id: "stock_id", label: "Stock ID" },
    { id: "stock_name", label: "Stock Name" },
    { id: "quantity", label: "Quantity" },
    { id: "status", label: "Status" },
    {
      id: "moved_at",
      label: "Moved At",
      render: (row) => formatTimestamp(row.moved_at),
    },
    {
      id: "last_location_updated_at",
      label: "Last Location Updated",
      render: (row) => formatTimestamp(row.last_location_updated_at),
    },
    {
      id: "source_location",
      label: "Source Location",
      render: (row) => row.source_location || "N/A",
    },
    {
      id: "destination_location",
      label: "Destination Location",
      render: (row) => row.destination_location || "N/A",
    },
  ];

  return (
    <Layout>
      <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          🚚 Transit Stock List
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Table columns={columns} data={rows} />
        </Paper>
      </Box>
    </Layout>
  );
};

export default TransitList;
