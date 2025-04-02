import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import Layout from "../components/Layout";
import { getForecast } from "../services/statsApi";

const PredictedInventory = () => {
  const [predictions, setPredictions] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getForecast();
        setPredictions(data);
      } catch (err) {
        console.error("Prediction failed:", err);
      }
    };
    fetch();
  }, []);

  const allMonths = Array.from(
    new Set(
      Object.values(predictions).flatMap((entry) =>
        typeof entry === "object" ? Object.keys(entry) : []
      )
    )
  ).sort();

  const filteredData = Object.entries(predictions)
    .filter(([_, value]) => typeof value === "object")
    .flatMap(([name, months]) =>
      Object.entries(months)
        .filter(([month]) => !selectedMonth || month === selectedMonth)
        .map(([month, quantity]) => ({
          stock_name: name,
          quantity,
          month: new Date(month).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          }),
        }))
    );

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          📈 Predicted Inventory Needs
        </Typography>

        <FormControl sx={{ my: 2, minWidth: 220 }}>
          <InputLabel>Filter by Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Filter by Month"
          >
            <MenuItem value="">All</MenuItem>
            {allMonths.map((m) => (
              <MenuItem key={m} value={m}>
                {new Date(m).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stock Name</TableCell>
                <TableCell>Quantity Needed</TableCell>
                <TableCell>Month</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.stock_name}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.month}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Layout>
  );
};

export default PredictedInventory;
