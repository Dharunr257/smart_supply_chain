import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { getDeliveredItems } from "../services/api";

const formatDate = (date) =>
  new Date(date).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

const DeliveredList = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchData = async () => {
    const data = await getDeliveredItems();
    setRows(data);
    filterByMonth(data, selectedMonth);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [selectedMonth]);

  const getUniqueMonths = () => {
    const months = rows.map((r) => formatDate(r.delivered_at));
    return Array.from(new Set(months));
  };

  const filterByMonth = (data, month) => {
    if (!month) return setFilteredRows(data);
    const filtered = data.filter(
      (row) => formatDate(row.delivered_at) === month
    );
    setFilteredRows(filtered);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    filterByMonth(rows, e.target.value);
  };

  const columns = [
    { id: "stock_id", label: "Stock ID" },
    { id: "stock_name", label: "Stock Name" },
    { id: "quantity", label: "Quantity" },
    { id: "status", label: "Status" },
    {
      id: "delivered_at",
      label: "Delivered At",
      render: (row) =>
        new Date(row.delivered_at).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    {
      id: "destination_location",
      label: "Delivered To",
      render: (row) => row.destination_location || "N/A",
    },
  ];

  return (
    <Layout>
      <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          📦 Delivered Stock List
        </Typography>

        <Box sx={{ mb: 2, textAlign: "right" }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Month</InputLabel>
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              label="Filter by Month"
            >
              <MenuItem value="">All</MenuItem>
              {getUniqueMonths().map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Table columns={columns} data={filteredRows} />
        </Paper>
      </Box>
    </Layout>
  );
};

export default DeliveredList;
