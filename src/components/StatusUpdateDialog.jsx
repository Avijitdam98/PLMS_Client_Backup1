import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

const statusOptions = [
  { value: "APPROVED", label: "Approve" },
  { value: "REJECTED", label: "Reject" },
  { value: "PENDING", label: "Pending" },
  { value: "DISBURSED", label: "Disburse" },
];

export default function StatusUpdateDialog({
  open,
  onClose,
  onSubmit,
  currentStatus,
}) {
  const [status, setStatus] = useState(currentStatus || "");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(status, comment);
    setLoading(false);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Loan Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            {statusOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Comment (optional)"
          multiline
          minRows={2}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !status}
        >
          {loading ? <CircularProgress size={20} /> : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
