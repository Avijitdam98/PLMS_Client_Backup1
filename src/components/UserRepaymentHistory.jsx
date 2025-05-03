import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
  useTheme,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EventIcon from "@mui/icons-material/Event";
import PaymentIcon from "@mui/icons-material/Payment";
import BlockIcon from "@mui/icons-material/Block";

const statusColors = {
  PAID: "success",
  PENDING: "warning",
  OVERDUE: "error",
  REJECTED: "default",
};

const statusIcons = {
  PAID: <PaymentIcon fontSize="small" sx={{ mr: 0.5 }} />,
  PENDING: <EventIcon fontSize="small" sx={{ mr: 0.5 }} />,
  OVERDUE: <BlockIcon fontSize="small" sx={{ mr: 0.5 }} />,
  REJECTED: <BlockIcon fontSize="small" sx={{ mr: 0.5 }} />,
};

const getStatusChip = (status) => (
  <Chip
    icon={statusIcons[status?.toUpperCase()] || null}
    label={status}
    color={statusColors[status?.toUpperCase()] || "default"}
    variant="filled"
    sx={{
      fontWeight: 600,
      letterSpacing: 1,
      textTransform: "capitalize",
      px: 1.5,
      borderRadius: 2,
      fontSize: "0.9rem",
    }}
  />
);

const UserRepaymentHistory = ({ userId }) => {
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    axios
      .get(`http://localhost:8732/api/repayments/user/${userId}`)
      .then((res) => setRepayments(res.data))
      .finally(() => setLoading(false));
  }, [userId]);

  if (!userId) {
    return (
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: 4,
          background: theme.palette.background.paper,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Please select a user to view their repayment history.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          background: "rgba(255,255,255,0.9)",
          boxShadow: theme.shadows[5],
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: 1.2,
            color: theme.palette.primary.main,
            mb: 2,
          }}
        >
          🧾 Repayment History
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    theme.palette.mode === "light"
                      ? "rgba(245,245,245,0.95)"
                      : theme.palette.background.default,
                }}
              >
                <TableCell sx={{ fontWeight: 700 }}>EMI #</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Application ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Paid Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : repayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary" sx={{ py: 2 }}>
                      No repayment records available for this user.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                repayments.map((r) => (
                  <TableRow
                    key={r.id}
                    hover
                    sx={{
                      transition: "background 0.2s",
                      "&:hover": {
                        background:
                          theme.palette.mode === "light"
                            ? "rgba(0,0,0,0.03)"
                            : "rgba(255,255,255,0.05)",
                      },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={`#${r.emiNumber}`}
                        size="small"
                        sx={{
                          bgcolor: theme.palette.grey[200],
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "text.primary" }}
                      >
                        {r.applicationId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <CurrencyRupeeIcon fontSize="small" />
                        <Typography>
                          {Number(r.emiAmount).toLocaleString("en-IN")}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {r.dueDate
                        ? new Date(r.dueDate).toLocaleDateString("en-IN")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {r.paidDate
                        ? new Date(r.paidDate).toLocaleDateString("en-IN")
                        : "-"}
                    </TableCell>
                    <TableCell>{getStatusChip(r.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserRepaymentHistory;
