import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";

const statusOptions = [
  { value: "in inventory", label: "Add to Inventory" },
  { value: "in transit", label: "Move to Transit" },
  { value: "delivered", label: "Mark as Delivered" },
];

const UpdateStatusForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [newStatus, setNewStatus] = useState("");
  const [stockId, setStockId] = useState("");
  const [error, setError] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleStatusSelect = () => {
    if (!newStatus) {
      setError("Please select a status");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!stockId || !newStatus) {
      setError("All fields are required");
      return;
    }

    // Prevent skipping stages
    if (newStatus === "in transit" && step === 1) {
      setError("You must first move the stock to Inventory");
      return;
    }
    if (newStatus === "delivered" && step === 1) {
      setError("You must first move the stock to Transit");
      return;
    }

    // Validate source/destination only for 'in transit'
    if (newStatus === "in transit" && (!source || !destination)) {
      setError("Please select both source and destination");
      return;
    }

    setError("");

    // ✅ Submit with extra fields conditionally
    onSubmit({
      stock_id: stockId.trim(),
      new_status: newStatus,
      ...(newStatus === "in transit" && {
        source_location: source,
        destination_location: destination,
      }),
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {step === 1 && (
        <>
          <Typography>Select the status to update to:</Typography>
          <TextField
            select
            label="New Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            fullWidth
            required
          >
            {statusOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleStatusSelect}>
            Continue
          </Button>
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Stock ID"
            value={stockId}
            onChange={(e) => setStockId(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          {newStatus === "in transit" && (
            <>
              <TextField
                select
                label="Source Location"
                fullWidth
                required
                value={source}
                onChange={(e) => setSource(e.target.value)}
                sx={{ mb: 2 }}
              >
                {["Chennai", "Bengaluru", "Salem", "Visakhapatnam"].map(
                  (loc) => (
                    <MenuItem key={loc} value={loc}>
                      {loc}
                    </MenuItem>
                  )
                )}
              </TextField>

              <TextField
                select
                label="Destination Location"
                fullWidth
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                sx={{ mb: 2 }}
              >
                {["Hosur", "Ambur", "Dharmapuri", "Tirupati"].map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}

          <Button variant="contained" type="submit">
            Update Status
          </Button>
        </form>
      )}

      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default UpdateStatusForm;
