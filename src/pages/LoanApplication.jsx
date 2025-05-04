import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Briefcase,
  CurrencyDollar,
  FileText,
  IdentificationCard,
  Info,
  Question,
  Upload,
  User,
  X,
} from "@phosphor-icons/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function hashCode(str) {
  let hash = 0;
  str = str.toUpperCase();
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getCreditScoreFromPan(pan) {
  if (!pan || pan.length < 5) return "";
  let hash = 0;
  pan = pan.toUpperCase();
  for (let i = 0; i < pan.length; i++) {
    hash = (hash << 5) - hash + pan.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);
  return 550 + (hash % 301);
}

const steps = ["Personal Info", "Loan Details", "Documents", "Review & Submit"];
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

// Professions aligned with SBI's professional loan schemes
const professions = [
  "Doctor",
  "Lawyer",
  "Chartered Accountant",
  "Architect",
  "Engineer",
  "Company Secretary",
  "Dentist",
  "Other Professional",
];

// Work-related loan purposes only, matching SBI's focus
const loanPurposes = [
  "Home Renovation",
  "Medical Emergency",
  "Debt Consolidation",
  "Travel or Vacation",
  "Electronic Gadgets Purchase",
  "Vehicle Down Payment",
  "Children’s School Fees",
  "Advance Rent or Deposit",
];

// Tenure limited to 84 months max, as per SBI
const loanTenures = [12, 24, 36, 48, 60, 72, 84];

// Step details emphasizing work-related professional loans
const stepDetails = {
  0: {
    title: "Personal Information",
    content:
      "Provide your full legal name and select your professional occupation. This verifies your eligibility for a work-related professional loan.",
  },
  1: {
    title: "Loan Details",
    content:
      "Specify the work-related loan purpose (e.g., practice setup, equipment purchase), amount (minimum ₹1,00,000), tenure (up to 84 months), and PAN card details. A valid PAN is required for credit score assessment.",
  },
  2: {
    title: "Document Upload",
    content:
      "Upload your latest PF Account Statement and Salary Slip in PDF format (max 5MB each) to verify your income and financial status as a professional.",
  },
  3: {
    title: "Review & Submit",
    content:
      "Review all details and documents carefully. Ensure accuracy before submitting your work-related professional loan application, as it cannot be edited post-submission.",
  },
};

function LoanApplication() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [formData, setFormData] = useState({
    name: user.name || "",
    profession: "",
    purpose: "",
    loanAmount: "",
    panCard: "",
    tenureInMonths: "",
  });

  const [files, setFiles] = useState({
    pfAccountPdf: null,
    salarySlip: null,
  });
  const [activeField, setActiveField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPDF, setShowPDF] = useState({
    pfAccountPdf: false,
    salarySlip: false,
  });
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const fileInputRefs = {
    pfAccountPdf: useRef(null),
    salarySlip: useRef(null),
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validateStep = () => {
    if (step === 0) {
      if (!formData.name.trim()) return "Name is required";
      if (!formData.profession) return "Profession is required";
    }
    if (step === 1) {
      if (!formData.purpose) return "Purpose is required";
      if (
        !formData.loanAmount ||
        isNaN(formData.loanAmount) ||
        Number(formData.loanAmount) < 100000
      )
        return "Loan amount must be at least ₹1,00,000";
      if (!formData.panCard.trim()) return "PAN card is required";
      if (!panRegex.test(formData.panCard))
        return "Enter a valid PAN card (e.g. ABCDE1234F)";
      if (!formData.tenureInMonths) return "Please select a loan tenure";
    }
    if (step === 2) {
      if (!files.pfAccountPdf) return "PF Account Statement PDF is required";
      if (!files.salarySlip) return "Salary Slip PDF is required";
    }
    return "";
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "panCard") value = value.toUpperCase();
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (fieldName) => setActiveField(fieldName);
  const handleBlur = () => setActiveField(null);

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles({ ...files, [name]: selectedFiles[0] });
    }
  };

  const removeFile = (fileType) => {
    setFiles({ ...files, [fileType]: null });
    if (fileInputRefs[fileType].current) {
      fileInputRefs[fileType].current.value = "";
    }
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setShowDetails(false);
    setStep(step + 1);
  };

  const handleBack = () => {
    setError("");
    setShowDetails(false);
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    if (!user.id) {
      setError("Please log in to apply for a professional loan");
      navigate("/login");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("userId", user.id);
    if (files.pfAccountPdf) data.append("pfAccountPdf", files.pfAccountPdf);
    if (files.salarySlip) data.append("salarySlip", files.salarySlip);

    try {
      await axios.post("http://localhost:8732/api/loans/apply", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Professional loan application submitted successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  const renderPDFPreview = (file) => {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    return (
      <Paper elevation={3} sx={{ mt: 2, p: 1, borderRadius: 2 }}>
        <iframe
          src={url}
          title="PDF Preview"
          width="100%"
          height={isMobile ? "200px" : "350px"}
          style={{ border: "none", borderRadius: 8 }}
        />
      </Paper>
    );
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Tooltip title="Enter your full legal name" arrow>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  inputProps={{ readOnly: true }}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    if (!/^[a-zA-Z\s]*$/.test(e.key) && e.key.length === 1) {
                      e.preventDefault();
                    }
                  }}
                  variant="outlined"
                  required
                  sx={{
                    minHeight: 56,
                    minWidth: 220,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      transition: "all 0.3s ease",
                      minHeight: 56,
                      fontSize: '1rem',
                      "&:hover": {
                        backgroundColor: "#edf2ff",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: activeField === "name" ? "#6d28d9" : "#475569",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <User
                        size={20}
                        color={activeField === "name" ? "#6d28d9" : "#64748b"}
                        style={{ marginRight: 12 }}
                      />
                    ),
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="Select your professional occupation" arrow>
                <FormControl fullWidth required sx={{ borderRadius: 3, minHeight: 56, minWidth: 220 }}>
                  <InputLabel
                    sx={{
                      color: activeField === "profession" ? "#6d28d9" : "#475569",
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Briefcase size={20} style={{ marginRight: 8 }} /> Profession
                  </InputLabel>
                  <Select
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    onFocus={() => handleFocus("profession")}
                    onBlur={handleBlur}
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      transition: "all 0.3s ease",
                      minHeight: 56,
                      minWidth: 220,
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: "#edf2ff",
                      },
                      '& .MuiSelect-icon': {
                        color: activeField === "profession" ? "#6d28d9" : "#64748b",
                      },
                    }}
                  >
                    {professions.map((prof) => (
                      <MenuItem key={prof} value={prof}>
                        {prof}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Tooltip>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Tooltip title="Select the work-related purpose of your professional loan" arrow>
                <FormControl fullWidth required sx={{ borderRadius: 3, minHeight: 56, minWidth: 220 }}>
                  <InputLabel
                    sx={{
                      color: activeField === "purpose" ? "#6d28d9" : "#475569",
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <FileText size={20} style={{ marginRight: 8 }} /> Loan Purpose
                  </InputLabel>
                  <Select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    onFocus={() => handleFocus("purpose")}
                    onBlur={handleBlur}
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      transition: "all 0.3s ease",
                      minHeight: 56,
                      minWidth: 220,
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: "#edf2ff",
                      },
                      '& .MuiSelect-icon': {
                        color: activeField === "purpose" ? "#6d28d9" : "#64748b",
                      },
                    }}
                  >
                    {loanPurposes.map((purpose) => (
                      <MenuItem key={purpose} value={purpose}>
                        {purpose}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={4}>
              <Tooltip title="Enter your PAN card (e.g. ABCDE1234F)" arrow>
                <TextField
                  fullWidth
                  label="PAN Card"
                  name="panCard"
                  value={formData.panCard}
                  onChange={handleChange}
                  onFocus={() => handleFocus("panCard")}
                  onBlur={handleBlur}
                  variant="outlined"
                  inputProps={{
                    maxLength: 10,
                    style: { textTransform: "uppercase" },
                  }}
                  required
                  sx={{
                    minHeight: 56,
                    minWidth: 220,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      transition: "all 0.3s ease",
                      minHeight: 56,
                      fontSize: '1rem',
                      "&:hover": {
                        backgroundColor: "#edf2ff",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: activeField === "panCard" ? "#6d28d9" : "#475569",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <IdentificationCard
                        size={20}
                        color={activeField === "panCard" ? "#6d28d9" : "#64748b"}
                        style={{ marginRight: 12 }}
                      />
                    ),
                  }}
                  error={!!formData.panCard && !panRegex.test(formData.panCard)}
                  helperText={
                    formData.panCard && !panRegex.test(formData.panCard)
                      ? "PAN must be in format ABCDE1234F"
                      : " "
                  }
                />
              </Tooltip>
              {formData.panCard && formData.panCard.length >= 5 && (
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={`Credit Score: ${getCreditScoreFromPan(
                      formData.panCard
                    )}`}
                    size="medium"
                    color={
                      getCreditScoreFromPan(formData.panCard) >= 600
                        ? "success"
                        : "error"
                    }
                    icon={<Info />}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 500,
                      fontSize: "1rem",
                      px: 2,
                      py: 1,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Tooltip title="Select your desired loan tenure (up to 84 months)" arrow>
                <FormControl fullWidth required sx={{ borderRadius: 3, minHeight: 56, minWidth: 220 }}>
                  <InputLabel
                    sx={{
                      color: activeField === "tenureInMonths" ? "#6d28d9" : "#475569",
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Briefcase size={20} style={{ marginRight: 8 }} /> Loan Tenure (Months)
                  </InputLabel>
                  <Select
                    name="tenureInMonths"
                    value={formData.tenureInMonths}
                    onChange={handleChange}
                    onFocus={() => handleFocus("tenureInMonths")}
                    onBlur={handleBlur}
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      transition: "all 0.3s ease",
                      minHeight: 56,
                      minWidth: 220,
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: "#edf2ff",
                      },
                      '& .MuiSelect-icon': {
                        color: activeField === "tenureInMonths" ? "#6d28d9" : "#64748b",
                      },
                    }}
                  >
                    {loanTenures.map((tenure) => (
                      <MenuItem key={tenure} value={tenure}>
                        {tenure} months
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={12}>
              <Tooltip title="Enter the amount you wish to borrow (minimum ₹1,00,000)" arrow>
                <TextField
                  fullWidth
                  label="Loan Amount (₹)"
                  name="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  onFocus={() => handleFocus("loanAmount")}
                  onBlur={handleBlur}
                  variant="outlined"
                  required
                  sx={{
                    minHeight: 56,
                    minWidth: 220,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      transition: "all 0.3s ease",
                      minHeight: 56,
                      fontSize: '1rem',
                      "&:hover": {
                        backgroundColor: "#edf2ff",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color:
                        activeField === "loanAmount" ? "#6d28d9" : "#475569",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <CurrencyDollar
                        size={20}
                        color={activeField === "loanAmount" ? "#6d28d9" : "#64748b"}
                        style={{ marginRight: 12 }}
                      />
                    ),
                    inputProps: { min: 100000 },
                  }}
                  error={
                    !!formData.loanAmount &&
                    Number(formData.loanAmount) < 100000
                  }
                  helperText={
                    !!formData.loanAmount &&
                    Number(formData.loanAmount) < 100000
                      ? "Minimum loan amount is ₹1,00,000"
                      : " "
                  }
                />
              </Tooltip>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Tooltip
                title="Upload your latest PF Account Statement (PDF, max 5MB) for income verification"
                arrow
              >
                <Box
                  onClick={() => fileInputRefs.pfAccountPdf.current?.click()}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: files.pfAccountPdf
                      ? "2px solid #22c55e"
                      : "2px dashed #94a3b8",
                    backgroundColor: files.pfAccountPdf
                      ? "rgba(34, 197, 94, 0.05)"
                      : "rgba(241, 245, 249, 0.5)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: files.pfAccountPdf
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgba(241, 245, 249, 0.8)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <input
                    type="file"
                    name="pfAccountPdf"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRefs.pfAccountPdf}
                    style={{ display: "none" }}
                    required={!files.pfAccountPdf}
                  />
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: files.pfAccountPdf
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgba(109, 40, 217, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Upload
                        size={24}
                        color={files.pfAccountPdf ? "#22c55e" : "#6d28d9"}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        PF Account Statement
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {files.pfAccountPdf
                          ? files.pfAccountPdf.name
                          : "PDF file (max 5MB)"}
                      </Typography>
                    </Box>
                  </Stack>
                  {files.pfAccountPdf && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile("pfAccountPdf");
                      }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "error.main",
                        "&:hover": {
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                        },
                      }}
                    >
                      <X size={20} />
                    </IconButton>
                  )}
                  {files.pfAccountPdf && (
                    <Button
                      size="small"
                      sx={{
                        mt: 1,
                        color: "#6d28d9",
                        "&:hover": {
                          backgroundColor: "rgba(109, 40, 217, 0.1)",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPDF({
                          ...showPDF,
                          pfAccountPdf: !showPDF.pfAccountPdf,
                        });
                      }}
                    >
                      {showPDF.pfAccountPdf ? "Hide Preview" : "Preview"}
                    </Button>
                  )}
                  {showPDF.pfAccountPdf && renderPDFPreview(files.pfAccountPdf)}
                </Box>
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip
                title="Upload your latest Salary Slip (PDF, max 5MB) for income verification"
                arrow
              >
                <Box
                  onClick={() => fileInputRefs.salarySlip.current?.click()}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: files.salarySlip
                      ? "2px solid #22c55e"
                      : "2px dashed #94a3b8",
                    backgroundColor: files.salarySlip
                      ? "rgba(34, 197, 94, 0.05)"
                      : "rgba(241, 245, 249, 0.5)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: files.salarySlip
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgba(241, 245, 249, 0.8)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <input
                    type="file"
                    name="salarySlip"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRefs.salarySlip}
                    style={{ display: "none" }}
                    required={!files.salarySlip}
                  />
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: files.salarySlip
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgba(109, 40, 217, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Upload
                        size={24}
                        color={files.salarySlip ? "#22c55e" : "#6d28d9"}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        Salary Slip
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {files.salarySlip
                          ? files.salarySlip.name
                          : "PDF file (max 5MB)"}
                      </Typography>
                    </Box>
                  </Stack>
                  {files.salarySlip && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile("salarySlip");
                      }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "error.main",
                        "&:hover": {
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                        },
                      }}
                    >
                      <X size={20} />
                    </IconButton>
                  )}
                  {files.salarySlip && (
                    <Button
                      size="small"
                      sx={{
                        mt: 1,
                        color: "#6d28d9",
                        "&:hover": {
                          backgroundColor: "rgba(109, 40, 217, 0.1)",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPDF({
                          ...showPDF,
                          salarySlip: !showPDF.salarySlip,
                        });
                      }}
                    >
                      {showPDF.salarySlip ? "Hide Preview" : "Preview"}
                    </Button>
                  )}
                  {showPDF.salarySlip && renderPDFPreview(files.salarySlip)}
                </Box>
              </Tooltip>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 700, color: "#1e293b" }}
            >
              Review Your Professional Loan Application
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ mb: 1, color: "#1e293b" }}>
                  <b>Name:</b> {formData.name}
                </Typography>
                <Typography sx={{ mb: 1, color: "#1e293b" }}>
                  <b>Profession:</b> {formData.profession}
                </Typography>
                <Typography sx={{ mb: 1, color: "#1e293b" }}>
                  <b>PAN Card:</b> {formData.panCard}
                </Typography>
                <Typography sx={{ mb: 1, color: "#1e293b" }}>
                  <b>Credit Score:</b>{" "}
                  <Chip
                    label={getCreditScoreFromPan(formData.panCard)}
                    color={
                      getCreditScoreFromPan(formData.panCard) >= 600
                        ? "success"
                        : "error"
                    }
                    size="small"
                    sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                  />
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ mb: 1, color: "#1e293b" }}>
                  <b>Purpose:</b> {formData.purpose}
                </Typography>
                <Typography sx={{ mb: 1, color: "#1e293b" }}>
                  <b>Loan Amount:</b> ₹{formData.loanAmount}
                </Typography>
                <Typography sx={{ mb: 1, color: "#1e293b" }}>
                  <b>Loan Tenure:</b> {formData.tenureInMonths} months
                </Typography>
                <Typography sx={{ mb: 1, color: "#1e293b" }}>
                  <b>PF Account PDF:</b>{" "}
                  {files.pfAccountPdf
                    ? files.pfAccountPdf.name
                    : "Not uploaded"}
                </Typography>
                <Typography sx={{ mb: 1, color: "#1e293b" }}>
                  <b>Salary Slip:</b>{" "}
                  {files.salarySlip ? files.salarySlip.name : "Not uploaded"}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Alert
                severity="info"
                sx={{
                  borderRadius: 3,
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  color: "#1e293b",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                Please verify all details before submitting your work-related
                professional loan application. This loan is exclusively for
                professional purposes like practice setup or equipment purchase.
                Once submitted, you cannot edit this application.
              </Alert>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  if (!user.id) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              p: 6,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: 4,
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
              textAlign: "center",
              maxWidth: 500,
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: 700, color: "#1e293b" }}
            >
              Authentication Required
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
              Please sign in to access the professional loan application portal
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: "linear-gradient(90deg, #6d28d9 0%, #4c1d95 100%)",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #5b21b6 0%, #3b0764 100%)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
        py: { xs: 2, md: 8 },
        px: { xs: 0, md: 2 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md" disableGutters={isMobile}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box
            sx={{
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(16px)",
              borderRadius: { xs: 3, md: 6 },
              boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
              p: { xs: 2, sm: 3, md: 5 },
              border: "1px solid rgba(255, 255, 255, 0.3)",
              maxWidth: 900,
              mx: "auto",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 4 }}
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
                  }}
                >
                  <FileText size={32} weight="fill" />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      background:
                        "linear-gradient(90deg, #6d28d9 0%, #4c1d95 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: { xs: "1.5rem", sm: "2.2rem" },
                    }}
                  >
                    Professional Loan Application
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Apply for a work-related loan in a few simple steps
                  </Typography>
                </Box>
              </Stack>
              <Tooltip title="View step details" arrow>
                <IconButton
                  onClick={() => setShowDetails(!showDetails)}
                  sx={{
                    color: "#6d28d9",
                    background: 'rgba(109, 40, 217, 0.08)',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: "rgba(109, 40, 217, 0.18)",
                    },
                  }}
                >
                  <Question size={26} />
                </IconButton>
              </Tooltip>
            </Stack>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Card
                    sx={{
                      mb: 4,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #f8fafc 0%, #edf2ff 100%)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      border: "1px solid rgba(109, 40, 217, 0.13)",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 700, color: "#1e293b" }}
                      >
                        {stepDetails[step].title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {stepDetails[step].content}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <Stepper
              activeStep={step}
              alternativeLabel
              sx={{
                mb: 4,
                '& .MuiStepLabel-label': {
                  fontWeight: 700,
                  color: step >= steps.indexOf(steps[step]) ? '#6d28d9' : '#64748b',
                  fontSize: { xs: '0.85rem', sm: '1rem' },
                },
                '& .MuiStepIcon-root': {
                  color: '#e0e7ff',
                  '&.Mui-active': {
                    color: '#6d28d9',
                    boxShadow: '0 2px 8px rgba(109, 40, 217, 0.18)',
                  },
                  '&.Mui-completed': {
                    color: '#22c55e',
                  },
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit}>
              {getStepContent(step)}

              <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  severity="error"
                  onClose={() => setError("")}
                  variant="filled"
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#ef4444",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  {error}
                </Alert>
              </Snackbar>
              <Snackbar
                open={!!success}
                autoHideDuration={4000}
                onClose={() => setSuccess("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  severity="success"
                  onClose={() => setSuccess("")}
                  variant="filled"
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "#22c55e",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  {success}
                </Alert>
              </Snackbar>

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: "space-between",
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: 2,
                }}
              >
                {step > 0 && (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={loading}
                    sx={{
                      borderRadius: 3,
                      borderColor: "#6d28d9",
                      color: "#6d28d9",
                      fontWeight: 700,
                      px: 3,
                      py: 1,
                      minWidth: 120,
                      '&:hover': {
                        backgroundColor: "rgba(109, 40, 217, 0.08)",
                        borderColor: "#5b21b6",
                      },
                    }}
                  >
                    Back
                  </Button>
                )}
                {step < steps.length - 1 && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                    sx={{
                      borderRadius: 3,
                      background:
                        "linear-gradient(90deg, #6d28d9 0%, #4c1d95 100%)",
                      fontWeight: 700,
                      px: 3,
                      py: 1,
                      minWidth: 120,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.13)",
                      '&:hover': {
                        background:
                          "linear-gradient(90deg, #5b21b6 0%, #3b0764 100%)",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
                      },
                    }}
                  >
                    Next
                  </Button>
                )}
                {step === steps.length - 1 && (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      borderRadius: 3,
                      background:
                        "linear-gradient(90deg, #6d28d9 0%, #4c1d95 100%)",
                      fontWeight: 700,
                      px: 3,
                      py: 1,
                      minWidth: 160,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.13)",
                      '&:hover': {
                        background:
                          "linear-gradient(90deg, #5b21b6 0%, #3b0764 100%)",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
                      },
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress
                          size={24}
                          color="inherit"
                          sx={{ mr: 2 }}
                        />
                        Processing...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                )}
              </Box>
              {loading && (
                <LinearProgress
                  sx={{
                    mt: 2,
                    borderRadius: 3,
                    backgroundColor: "rgba(109, 40, 217, 0.08)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#6d28d9",
                    },
                  }}
                />
              )}
            </form>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default LoanApplication;
