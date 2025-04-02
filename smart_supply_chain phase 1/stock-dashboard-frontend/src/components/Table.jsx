import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const formatTimestamp = (ts) => {
  if (!ts) return "N/A";
  try {
    return new Date(ts).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

const Table = ({ data = [], highlightId = null }) => {
  if (!data.length) {
    return (
      <Typography sx={{ mt: 2 }} color="text.secondary">
        No stock data available.
      </Typography>
    );
  }

  // Dynamically build columns from first row keys (plus timestamp logic)
  const sample = data[0];
  const keys = Object.keys(sample);

  // Always include common columns in preferred order
  const defaultColumns = [
    "stock_id",
    "stock_name",
    "quantity",
    "status",
    "source_location",
    "destination_location",
    "delivered_at",
    "moved_at",
    "last_location_updated_at",
    "updated_at",
    "moved_to_inventory_at",
  ];

  const visibleColumns = defaultColumns.filter((key) => keys.includes(key));

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {visibleColumns.map((key) => (
                <TableCell key={key}>
                  <strong>
                    {{
                      stock_id: "Stock ID",
                      stock_name: "Stock Name",
                      quantity: "Quantity",
                      status: "Status",
                      source_location: "Source",
                      destination_location: "Destination",
                      delivered_at: "Delivered At",
                      moved_at: "Moved At",
                      last_location_updated_at: "Last Location Updated",
                      updated_at: "Last Updated",
                      moved_to_inventory_at: "Inventory Timestamp",
                    }[key] || key}
                  </strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.stock_id}
                sx={{
                  backgroundColor:
                    item.stock_id === highlightId
                      ? "rgba(255, 215, 0, 0.2)"
                      : "inherit",
                }}
              >
                {visibleColumns.map((key) => (
                  <TableCell key={key}>
                    {key.includes("_at")
                      ? formatTimestamp(item[key])
                      : item[key] || "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};

export default Table;
