import {
  AttachMoney,
  Cancel,
  CheckCircle,
  Dashboard as DashboardIcon,
  FilterList,
  Pending,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Fade,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  Divider,
  Table,
  useTheme,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationBell from "../components/NotificationBell";
import UserDocuments from "../components/UserDocuments";
import UserRepaymentHistory from "../components/UserRepaymentHistory";
import ApplicationsList from "../dashboard/ApplicationsList";
import ChartsSection from "../dashboard/ChartsSection";
import EmiDialog from "../dashboard/EmiDialog";
import PdfDialog from "../dashboard/PdfDialog";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [docsLoading, setDocsLoading] = useState(false);

  // EMI Repayment state
  const [selectedLoanEMIs, setSelectedLoanEMIs] = useState([]);
  const [emiDialogOpen, setEmiDialogOpen] = useState(false);
  const [emiLoading, setEmiLoading] = useState(false);

  // Admin: userId for repayment history
  const [selectedUserId, setSelectedUserId] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const theme = useTheme();

  const statusFilters = [
    {
      value: "ALL",
      label: "All Statuses",
      icon: <FilterList fontSize="small" />,
    },
    {
      value: "PENDING",
      label: "Pending",
      icon: <Pending color="warning" fontSize="small" />,
    },
    {
      value: "APPROVED",
      label: "Approved",
      icon: <CheckCircle color="success" fontSize="small" />,
    },
    {
      value: "REJECTED",
      label: "Rejected",
      icon: <Cancel color="error" fontSize="small" />,
    },
    {
      value: "DISBURSED",
      label: "Disbursed",
      icon: <AttachMoney color="primary" fontSize="small" />,
    },
  ];

  const getStatusData = () => {
    const statusCounts = applications.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      },
      { PENDING: 0, APPROVED: 0, REJECTED: 0, DISBURSED: 0 }
    );
    return [
      {
        name: "Pending",
        value: statusCounts.PENDING,
        color: theme.palette.warning.main,
      },
      {
        name: "Approved",
        value: statusCounts.APPROVED,
        color: theme.palette.success.main,
      },
      {
        name: "Rejected",
        value: statusCounts.REJECTED,
        color: theme.palette.error.main,
      },
      {
        name: "Disbursed",
        value: statusCounts.DISBURSED,
        color: theme.palette.primary.main,
      },
    ].filter((item) => item.value > 0);
  };

  const getMonthlyData = () => {
    const monthly = {};
    applications.forEach((app) => {
      const date = new Date(app.createdAt || app.applicationDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      if (!monthly[key])
        monthly[key] = { applications: 0, approved: 0, month: key };
      monthly[key].applications += 1;
      if (app.status === "APPROVED" || app.status === "DISBURSED")
        monthly[key].approved += 1;
    });
    return Object.values(monthly).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  };

  const getPurposeData = () => {
    const purposeSums = applications.reduce((acc, app) => {
      acc[app.purpose] = (acc[app.purpose] || 0) + Number(app.loanAmount);
      return acc;
    }, {});
    return Object.keys(purposeSums).map((purpose) => ({
      purpose,
      amount: purposeSums[purpose],
    }));
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.purpose?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    // Accept id: 0 as valid (only null or undefined is invalid)
    if (user.id == null || !user.role) {
      setError("User not logged in or invalid session");
      setLoading(false);
      toast.error("Please log in to view your dashboard");
      return;
    }
    fetchApplications();
    // eslint-disable-next-line
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const endpoint =
        user.role === "ADMIN"
          ? "http://localhost:8732/api/loans/all"
          : `http://localhost:8732/api/loans/user/${user.id}`;
      const response = await axios.get(endpoint);
      setApplications(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to load applications";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const fetchDocuments = async (app) => {
    const applicationId = app.applicationId;
    if (!applicationId) {
      toast.error("Application ID not found.");
      setSelectedDocs([]);
      setPdfDialogOpen(true);
      return;
    }
    setDocsLoading(true);
    setPdfDialogOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8732/api/loans/documents/application/${applicationId}`
      );
      console.log("Fetched documents:", response.data); // Debug log
      setSelectedDocs(response.data || []);
    } catch (e) {
      setSelectedDocs([]);
      toast.error("Failed to load documents");
    } finally {
      setDocsLoading(false);
    }
  };

  // --- Admin Document Verification Handler ---
  const handleVerify = async (documentId) => {
    if (!documentId) {
      toast.error("Invalid document ID");
      return;
    }

    try {
      console.log("Verifying document with ID:", documentId);
      await axios.put(
        `http://localhost:8732/api/documents/verify/${documentId}`
      );
      toast.success("Document verified successfully!");

      // Refresh the document list after verification
      if (selectedDocs.length > 0 && selectedDocs[0].applicationId) {
        fetchDocuments({ applicationId: selectedDocs[0].applicationId });
      } else {
        // Alternatively, update the local state to avoid a refetch
        setSelectedDocs((prevDocs) =>
          prevDocs.map((doc) =>
            doc.id === documentId || doc.documentId === documentId
              ? { ...doc, isVerified: true }
              : doc
          )
        );
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.response?.data?.message || "Failed to verify document");
    }
  };

  const handleStatusUpdate = async (applicationId, status, comment) => {
    try {
      await axios.put(
        `http://localhost:8732/api/loans/update-status/${applicationId}`,
        null,
        { params: { status: status.toUpperCase(), comment } }
      );
      toast.success(`Application ${status.toLowerCase()}!`);
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  const handleDisburse = async (applicationId) => {
    try {
      const application = applications.find(
        (app) => app.applicationId === applicationId
      );

      if (application.status !== "APPROVED") {
        toast.error("Loan application must be approved before disbursement");
        return;
      }

      const amount = Number(application.loanAmount);
      const url = `http://localhost:8732/api/disbursements/disburse/${applicationId}`;

      await axios({
        method: "post",
        url: url,
        params: {
          amount: amount,
        },
      });

      toast.success("Loan disbursed!");
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data || "Disbursement failed");
    }
  };

  // --- EMI Repayment Logic ---
  const fetchEMIs = async (applicationId) => {
    setEmiLoading(true);
    setEmiDialogOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8732/api/repayments/loan/${applicationId}`
      );
      setSelectedLoanEMIs(response.data || []);
    } catch (e) {
      setSelectedLoanEMIs([]);
      toast.error("Failed to load EMI schedule");
    } finally {
      setEmiLoading(false);
    }
  };

  const handlePayEmi = async (repaymentId, applicationId) => {
    try {
      await axios.post(
        `http://localhost:8732/api/repayments/pay/${repaymentId}`
      );
      toast.success("EMI paid successfully!");
      fetchEMIs(applicationId); // Refresh EMI list
    } catch (e) {
      toast.error(e.response?.data?.error || "Failed to pay EMI");
    }
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: theme.palette.background.default,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, textAlign: "center", p: 4 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                mb: 3,
              }}
            >
              <DashboardIcon fontSize="large" />
            </Avatar>
          </motion.div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Loading Your Dashboard
          </Typography>
          <LinearProgress color="primary" />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: theme.palette.background.default,
        }}
      >
        <Paper
          sx={{
            p: 4,
            maxWidth: 500,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: theme.shadows[10],
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            Dashboard Error
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {typeof error === "string"
              ? error
              : "Failed to load dashboard data"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchApplications}
            sx={{ borderRadius: 3, px: 4 }}
          >
            Try Again
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : '#f4f7fb',
        py: 4,
      }}
    >
      <ToastContainer />
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            background: theme.palette.mode === 'dark'
              ? 'rgba(19, 47, 76, 0.4)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* --- NOTIFICATION BELL --- */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <NotificationBell userId={user.id} />
          </Box>

          <Box sx={{ mb: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                {user.role === "ADMIN" ? "Admin Dashboard" : "My Loan Dashboard"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {formattedDate}
              </Typography>
            </motion.div>
          </Box>

          {user.role === "ADMIN" && (
            <Fade in>
              <Paper
                elevation={4}
                sx={{
                  my: 4,
                  p: { xs: 2, md: 3 },
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                      letterSpacing: 1,
                      textAlign: "center",
                    }}
                  >
                    User Repayment History Lookup
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ textAlign: "center", mb: 1 }}
                  >
                    Enter a User ID to view their full repayment history
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <TextField
                      type="number"
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      placeholder="User ID"
                      variant="outlined"
                      size="medium"
                      sx={{
                        minWidth: 220,
                        borderRadius: 3,
                        background: "#fff",
                        boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.08)",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton disabled>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        inputProps: { min: 1 },
                      }}
                    />
                  </Box>
                  <Box>
                    <UserRepaymentHistory userId={selectedUserId} />
                  </Box>
                </Stack>
              </Paper>
            </Fade>
          )}

          {/* --- CHARTS SECTION --- */}
          <ChartsSection
            applications={applications}
            theme={theme}
            getStatusData={getStatusData}
            getMonthlyData={getMonthlyData}
            getPurposeData={getPurposeData}
          />

          {/* --- USER DOCUMENT UPLOAD & VIEW SECTION (as a component) --- */}
          <UserDocuments userId={user.id} userRole={user.role} />

          {/* --- APPLICATIONS SECTION --- */}
          <ApplicationsList
            applications={filteredApplications}
            user={user}
            onFetchDocuments={fetchDocuments}
            onFetchEMIs={fetchEMIs}
            onStatusUpdate={handleStatusUpdate}
            onDisburse={handleDisburse}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            filterAnchorEl={filterAnchorEl}
            setFilterAnchorEl={setFilterAnchorEl}
            statusFilters={statusFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            theme={theme}
          />

          {/* PDF Dialog for Application */}
          <PdfDialog
            open={pdfDialogOpen}
            onClose={() => setPdfDialogOpen(false)}
            docsLoading={docsLoading}
            selectedDocs={selectedDocs}
            userRole={user.role}
            onVerify={handleVerify}
          />

          {/* --- EMI Dialog for Users --- */}
          <EmiDialog
            open={emiDialogOpen}
            onClose={() => setEmiDialogOpen(false)}
            emiLoading={emiLoading}
            selectedLoanEMIs={selectedLoanEMIs}
            onPayEmi={handlePayEmi}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default Dashboard;
