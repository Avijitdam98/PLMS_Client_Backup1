import React, { useState, useEffect } from "react";
import {
  AttachMoney,
  Cancel,
  CheckCircle,
  FilterList,
  Home,
  PictureAsPdf,
  Score,
  Work,
  Comment,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip as MuiTooltip,
  Paper,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import LoanApplicationDetailsDialog from "../components/LoanApplicationDetailsDialog";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ApplicationsList = ({
  applications,
  user,
  onFetchDocuments,
  onFetchEMIs,
  onStatusUpdate,
  onDisburse,
  statusFilter,
  setStatusFilter,
  filterAnchorEl,
  setFilterAnchorEl,
  statusFilters,
  searchQuery,
  setSearchQuery,
  theme,
}) => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [hasCheckedCreditScore, setHasCheckedCreditScore] = useState(false);
  const [creditScore, setCreditScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCreditScoreStatus = () => {
      const checked = localStorage.getItem("hasCheckedCreditScore") === "true";
      const score = parseInt(localStorage.getItem("creditScore"), 10) || null;
      setHasCheckedCreditScore(checked);
      setCreditScore(score);
    };

    checkCreditScoreStatus();
    window.addEventListener("storage", checkCreditScoreStatus);
    return () => window.removeEventListener("storage", checkCreditScoreStatus);
  }, []);

  const handleOpenDetails = (app) => {
    setSelectedApp(app);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => setDetailsOpen(false);

  const handleOpenCommentDialog = (applicationId, status) => {
    setSelectedApplicationId(applicationId);
    setSelectedStatus(status);
    setComment("");
    setCommentDialogOpen(true);
  };

  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setSelectedApplicationId(null);
    setSelectedStatus(null);
    setComment("");
  };

  const handleSubmitComment = () => {
    if (selectedApplicationId && selectedStatus) {
      onStatusUpdate(selectedApplicationId, selectedStatus, comment);
    }
    handleCloseCommentDialog();
  };

  const handleNewApplicationClick = (e) => {
    if (!hasCheckedCreditScore) {
      e.preventDefault();
      toast.error("Please check your credit score first!", {
        position: "top-center",
        style: { backgroundColor: "#ff4d4d", color: "#fff" },
      });
      navigate("/credit-score");
    } else if (creditScore <= 600) {
      e.preventDefault();
      toast.error("Your credit score is too low to apply for a loan.", {
        position: "top-center",
        style: { backgroundColor: "#ff4d4d", color: "#fff" },
      });
      navigate("/credit-score");
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
        mb: 4,
        backdropFilter: "blur(6px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
          Loan Applications
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            sx={{ borderRadius: 3, fontWeight: 600 }}
          >
            Filter
          </Button>
          {user.role !== "ADMIN" && (
            <MuiTooltip
              title={
                !hasCheckedCreditScore
                  ? "Please check your credit score first"
                  : creditScore <= 600
                  ? "Your credit score is too low to apply for a loan"
                  : "Apply for a new loan"
              }
            >
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 3, fontWeight: 600 }}
                  href="/apply-loan"
                  disabled={!hasCheckedCreditScore || creditScore <= 600}
                  onClick={handleNewApplicationClick}
                >
                  New Application
                </Button>
              </span>
            </MuiTooltip>
          )}
        </Box>
      </Box>

      <Box sx={{ mb: 2, maxWidth: 340 }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search by name or purpose"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            sx: { borderRadius: 2, background: "#f4f7fb" },
          }}
        />
      </Box>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 3,
          },
        }}
      >
        {statusFilters.map((filter) => (
          <MenuItem
            key={filter.value}
            selected={statusFilter === filter.value}
            onClick={() => {
              setStatusFilter(filter.value);
              setFilterAnchorEl(null);
            }}
          >
            <ListItemIcon>{filter.icon}</ListItemIcon>
            <ListItemText>{filter.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {applications.length === 0 ? (
        <Box
          sx={{
            p: 8,
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.action.hover, 0.05),
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No applications found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchQuery
              ? "Try a different search term"
              : statusFilter !== "ALL"
              ? "No applications with this status"
              : "You have no applications yet"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <AnimatePresence>
            {applications.map((app) => (
              <Grid item xs={12} sm={6} md={4} key={app.applicationId}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      height: "100%",
                      background: "rgba(255,255,255,0.85)",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
                      border: "1.5px solid",
                      borderColor: alpha(theme.palette.primary.main, 0.08),
                      backdropFilter: "blur(6px)",
                      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 2.5,
                      "&:hover": {
                        boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.16)",
                        transform: "translateY(-4px) scale(1.02)",
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                      },
                    }}
                  >
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                            fontSize: "1.15rem",
                          }}
                        >
                          {app.name}
                        </Typography>
                        <Chip
                          label={app.status}
                          size="medium"
                          icon={
                            app.status === "APPROVED" ? (
                              <CheckCircle />
                            ) : app.status === "REJECTED" ? (
                              <Cancel />
                            ) : app.status === "DISBURSED" ? (
                              <AttachMoney />
                            ) : (
                              <FilterList />
                            )
                          }
                          sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            fontSize: "1rem",
                            px: 1.5,
                            background:
                              app.status === "APPROVED"
                                ? alpha(theme.palette.success.main, 0.12)
                                : app.status === "REJECTED"
                                ? alpha(theme.palette.error.main, 0.12)
                                : app.status === "DISBURSED"
                                ? alpha(theme.palette.primary.main, 0.12)
                                : alpha(theme.palette.warning.main, 0.1),
                            color:
                              app.status === "APPROVED"
                                ? theme.palette.success.dark
                                : app.status === "REJECTED"
                                ? theme.palette.error.dark
                                : app.status === "DISBURSED"
                                ? theme.palette.primary.dark
                                : theme.palette.warning.dark,
                          }}
                        />
                      </Box>

                      <Stack spacing={1.2}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Work
                            sx={{
                              color: theme.palette.info.main,
                              fontSize: 22,
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {app.profession}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Home
                            sx={{
                              color: theme.palette.secondary.main,
                              fontSize: 22,
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {app.purpose}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AttachMoney
                            sx={{
                              color: theme.palette.success.main,
                              fontSize: 22,
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            ₹{Number(app.loanAmount).toLocaleString()}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Score
                            sx={{
                              color: theme.palette.warning.main,
                              fontSize: 22,
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Credit Score: {app.creditScore}
                          </Typography>
                        </Box>
                        {app.statusComment && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Comment
                              sx={{
                                color: theme.palette.info.main,
                                fontSize: 22,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              Comment: {app.statusComment}
                            </Typography>
                          </Box>
                        )}
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{ mt: 2, flexWrap: "wrap" }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ borderRadius: 2, fontWeight: 600, mt: 1 }}
                          onClick={() => handleOpenDetails(app)}
                        >
                          View Details
                        </Button>
                        {user.role === "ADMIN" && (
                          <>
                            <MuiTooltip
                              title="View all user-submitted PDFs"
                              arrow
                            >
                              <Button
                                variant="outlined"
                                startIcon={<PictureAsPdf />}
                                onClick={async () =>
                                  await onFetchDocuments(app)
                                }
                                sx={{
                                  borderRadius: 2,
                                  textTransform: "none",
                                  background:
                                    "linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)",
                                  fontWeight: 600,
                                }}
                                color="secondary"
                              >
                                Documents
                              </Button>
                            </MuiTooltip>
                            {app.status === "PENDING" && (
                              <>
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  onClick={() =>
                                    handleOpenCommentDialog(
                                      app.applicationId,
                                      "APPROVED"
                                    )
                                  }
                                  sx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() =>
                                    handleOpenCommentDialog(
                                      app.applicationId,
                                      "REJECTED"
                                    )
                                  }
                                  sx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                  }}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            {app.status === "APPROVED" && (
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => onDisburse(app.applicationId)}
                                sx={{
                                  borderRadius: 2,
                                  textTransform: "none",
                                  fontWeight: 600,
                                }}
                              >
                                Disburse
                              </Button>
                            )}
                          </>
                        )}

                        {user.role !== "ADMIN" &&
                          app.status === "DISBURSED" && (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ borderRadius: 2, fontWeight: 600 }}
                              onClick={() => onFetchEMIs(app.applicationId)}
                            >
                              View/Pay EMIs
                            </Button>
                          )}
                        {user.role !== "ADMIN" && app.status === "CLOSED" && (
                          <Chip
                            label="Loan Closed"
                            color="info"
                            size="small"
                            sx={{ borderRadius: 2, fontWeight: 600 }}
                          />
                        )}
                      </Stack>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}

      <LoanApplicationDetailsDialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        application={selectedApp}
      />

      <Dialog
        open={commentDialogOpen}
        onClose={handleCloseCommentDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{`Add Comment for ${selectedStatus} Status`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment (Optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommentDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitComment}
            color="primary"
            variant="contained"
            disabled={comment.trim().length > 500}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ApplicationsList;
