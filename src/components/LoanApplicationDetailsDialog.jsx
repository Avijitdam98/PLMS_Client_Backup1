import { Comment } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

// Utility to format currency
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

// Utility to get status chip styles
const getStatusChipProps = (status) => {
  switch (status) {
    case "APPROVED":
      return { color: "success", variant: "filled" };
    case "REJECTED":
      return { color: "error", variant: "filled" };
    case "DISBURSED":
      return { color: "primary", variant: "filled" };
    default:
      return { color: "warning", variant: "outlined" };
  }
};

const LoanApplicationDetailsDialog = ({ open, onClose, application }) => {
  const theme = useTheme();

  if (!application) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="loan-application-dialog-title"
      sx={{ "& .MuiDialog-paper": { borderRadius: 2 } }}
    >
      <DialogTitle
        id="loan-application-dialog-title"
        sx={{ bgcolor: theme.palette.grey[100], py: 1.5 }}
      >
        Loan Application Details
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, py: 2 }}>
          <Typography variant="body1">
            <strong>Name:</strong> {application.name}
          </Typography>
          <Typography variant="body1">
            <strong>Profession:</strong> {application.profession}
          </Typography>
          <Typography variant="body1">
            <strong>Purpose:</strong> {application.purpose}
          </Typography>
          <Typography variant="body1">
            <strong>Loan Amount:</strong>{" "}
            {formatCurrency(application.loanAmount)}
          </Typography>
          <Typography variant="body1">
            <strong>Credit Score:</strong> {application.creditScore}
          </Typography>
          <Typography variant="body1">
            <strong>PAN Card:</strong> {application.panCard}
          </Typography>
          <Typography variant="body1">
            <strong>Tenure:</strong> {application.tenureInMonths} months
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong>{" "}
            <Chip
              label={application.status}
              {...getStatusChipProps(application.status)}
              size="small"
              sx={{ fontWeight: "medium" }}
            />
          </Typography>
          {application.statusComment && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Comment color="info" fontSize="small" />
              <Typography variant="body1">
                <strong>Comment:</strong> {application.statusComment}
              </Typography>
            </Box>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Application ID:</strong> {application.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Submitted:</strong>{" "}
            {new Date(application.submittedAt).toLocaleDateString("en-IN")}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          sx={{ minWidth: 100 }}
        >
          Close
        </Button>
        {application.status === "PENDING" && (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={() => console.log("Approve")}
              sx={{ minWidth: 100 }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => console.log("Reject")} 
              sx={{ minWidth: 100 }}
            >
              Reject
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

// PropTypes for type checking
LoanApplicationDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  application: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    purpose: PropTypes.string,
    loanAmount: PropTypes.number,
    creditScore: PropTypes.number,
    panCard: PropTypes.string,
    tenureInMonths: PropTypes.number,
    status: PropTypes.oneOf(["PENDING", "APPROVED", "REJECTED", "DISBURSED"]),
    statusComment: PropTypes.string,
    submittedAt: PropTypes.string,
  }),
};

export default LoanApplicationDetailsDialog;
