import {
  ArrowForward,
  CheckCircle,
  Close,
  Lock,
  Visibility,
  VisibilityOff,
  ErrorOutline,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const paymentMethods = [
  {
    id: "upi",
    name: "UPI Payment",
    color: "#4285F4",
    banks: [
      {
        name: "Google Pay",
        icon: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
        short: "G",
      },
      {
        name: "PhonePe",
        icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/PhonePe_Logo.svg",
        short: "P",
      },
      {
        name: "Paytm",
        icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg",
        short: "P",
      },
      {
        name: "BHIM UPI",
        icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/BHIM_UPI_Logo.svg",
        short: "B",
      },
    ],
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: "https://cdn-icons-png.flaticon.com/512/179/179431.png",
    color: "#FF6B6B",
    short: "C",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: "https://cdn-icons-png.flaticon.com/512/1057/1057098.png",
    color: "#20B2AA",
    short: "N",
  },
];

const EmiDialog = ({ open, onClose, emiLoading, selectedLoanEMIs, paymentMode = "all" }) => {
  const [currentMode, setCurrentMode] = useState(paymentMode); // Track the selected mode
  const [selectedEMIId, setSelectedEMIId] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [processing, setProcessing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [paidEmiData, setPaidEmiData] = useState({});
  const [paymentStep, setPaymentStep] = useState("list"); // 'list', 'method', 'bank', 'upi_verify', 'upi_pin', 'card', 'processing', 'success', 'failure'
  const [upiId, setUpiId] = useState("");
  const [upiPin, setUpiPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [countdown, setCountdown] = useState(5);
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [failureReason, setFailureReason] = useState("");
  const theme = useTheme();

  // Filter EMIs based on the current mode
  const getDisplayEMIs = () => {
    if (currentMode === "sequential") {
      // Find the first pending EMI
      const firstPendingEMI = selectedLoanEMIs.find(
        (emi) => emi.status !== "PAID" && paidEmiData[emi.id]?.status !== "PAID"
      );
      return firstPendingEMI ? [firstPendingEMI] : [];
    }
    return selectedLoanEMIs;
  };

  const displayEMIs = getDisplayEMIs();
  const selectedEMI = displayEMIs.find((emi) => emi.id === selectedEMIId);

  // Reset payment flow when dialog closes
  useEffect(() => {
    if (!open) {
      resetPaymentFlow();
    }
  }, [open]);

  // Reset mode when dialog opens
  useEffect(() => {
    if (open) {
      setCurrentMode(paymentMode);
    }
  }, [open, paymentMode]);

  // Countdown timer for success and failure screens
  useEffect(() => {
    if (paymentStep === "success" || paymentStep === "failure") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setPaymentStep("list");
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentStep]);

  const handlePaymentClick = (emiId) => {
    setSelectedEMIId(emiId);
    setPaymentStep("method");
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    if (method === "upi") {
      setPaymentStep("bank");
    } else if (method === "card") {
      setPaymentStep("card");
    } else {
      setPaymentStep("processing");
      processPayment(method);
    }
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setPaymentStep("upi_verify");
  };

  const verifyUpiId = async () => {
    setProcessing(true);
    try {
      // Simulate UPI ID verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsUpiVerified(true);
      setPaymentStep("upi_pin");
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Invalid UPI ID. Please try again.",
        severity: "error",
      });
    } finally {
      setProcessing(false);
    }
  };

  const processPayment = async () => {
    setProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post(
        `http://localhost:8732/api/repayments/simulatepay`,
        null,
        {
          params: {
            repaymentId: selectedEMIId,
            method: selectedMethod === "upi" ? selectedBank : selectedMethod,
          },
        }
      );

      const txnId = response.data.transactionId;
      const paymentMethod = response.data.paymentMethod;

      setPaidEmiData((prev) => ({
        ...prev,
        [selectedEMIId]: {
          status: "PAID",
          transactionId: txnId,
          method: paymentMethod,
          paidDate: new Date().toISOString().split("T")[0],
        },
      }));

      setSnackbar({
        open: true,
        message: `Payment successful via ${paymentMethod}. Txn ID: ${txnId}`,
        severity: "success",
      });

      setPaymentStep("success");
    } catch (error) {
      const failureMessage = error.response?.data?.message || "Payment failed due to an unexpected error.";
      setFailureReason(failureMessage);
      setPaidEmiData((prev) => ({
        ...prev,
        [selectedEMIId]: {
          status: "FAILED",
          failureReason: failureMessage,
        },
      }));

      setSnackbar({
        open: true,
        message: failureMessage,
        severity: "error",
      });

      setPaymentStep("failure");
    } finally {
      setProcessing(false);
    }
  };

  const handleUpiVerifySubmit = (e) => {
    e.preventDefault();
    if (upiId) {
      verifyUpiId();
    }
  };

  const handleUpiPinSubmit = (e) => {
    e.preventDefault();
    if (upiPin.length === 4) {
      setPaymentStep("processing");
      processPayment();
    }
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (
      cardDetails.number &&
      cardDetails.expiry &&
      cardDetails.cvv &&
      cardDetails.name
    ) {
      setPaymentStep("processing");
      processPayment();
    }
  };

  const resetPaymentFlow = () => {
    setPaymentStep("list");
    setSelectedEMIId(null);
    setSelectedMethod("");
    setSelectedBank("");
    setUpiId("");
    setUpiPin("");
    setIsUpiVerified(false);
    setFailureReason("");
    setCardDetails({
      number: "",
      expiry: "",
      cvv: "",
      name: "",
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleRetryPayment = () => {
    setPaymentStep("method");
    setFailureReason("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.9)
            : '#fff',
          backdropFilter: 'blur(10px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
            : '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.18)',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.primary.main,
            }}
          >
            EMI Details
          </Typography>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Payment Mode</InputLabel>
            <Select
              value={currentMode}
              onChange={(e) => {
                setCurrentMode(e.target.value);
                setPaymentStep("list"); // Reset to list view when mode changes
              }}
              label="Payment Mode"
            >
              <MenuItem value="all">Pay Any EMI</MenuItem>
              <MenuItem value="sequential">Pay One by One</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0, minHeight: 400 }}>
        {emiLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <CircularProgress />
          </Box>
        ) : displayEMIs.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body1">
              {currentMode === "sequential" ? "All EMIs paid" : "No pending EMIs found"}
            </Typography>
          </Box>
        ) : (
          <AnimatePresence mode="wait">
            {paymentStep === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    {currentMode === "sequential" ? "Next EMI to Pay" : "Upcoming Payments"}
                  </Typography>
                  {displayEMIs.map((emi) => {
                    const localData = paidEmiData[emi.id];
                    const isPaid =
                      emi.status === "PAID" || localData?.status === "PAID";
                    const isFailed = localData?.status === "FAILED";
                    const paidDate = localData?.paidDate || emi.paidDate;

                    return (
                      <motion.div
                        key={emi.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          sx={{
                            mb: 2,
                            p: 2,
                            borderRadius: 2,
                            borderLeft: `4px solid ${
                              isPaid
                                ? "#4CAF50"
                                : isFailed
                                ? "#F44336"
                                : emi.status === "OVERDUE"
                                ? "#F44336"
                                : "#FFC107"
                            }`,
                            boxShadow: theme.palette.mode === 'dark'
                              ? '0 2px 8px rgba(0,0,0,0.2)'
                              : '0 2px 8px rgba(0,0,0,0.1)',
                            background: isPaid
                              ? theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(200, 247, 200, 0.1))'
                                : 'linear-gradient(135deg, #e0ffe0, #c8f7c8)'
                              : isFailed
                              ? theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(255, 205, 210, 0.1))'
                                : 'linear-gradient(135deg, #ffe0e0, #ffc8c8)'
                              : theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(255, 251, 224, 0.1), rgba(247, 240, 200, 0.1))'
                                : 'linear-gradient(135deg, #fffbe0, #f7f0c8)',
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box>
                              <Typography
                                variant="subtitle1"
                                fontWeight="medium"
                              >
                                EMI #{emi.emiNumber} • ₹{emi.emiAmount}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Due: {emi.dueDate}
                                {isPaid && ` • Paid on: ${paidDate}`}
                                {isFailed && ` • Failed: ${localData?.failureReason}`}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Chip
                                label={isPaid ? "PAID" : isFailed ? "FAILED" : emi.status}
                                color={
                                  isPaid
                                    ? "success"
                                    : isFailed
                                    ? "error"
                                    : emi.status === "OVERDUE"
                                    ? "error"
                                    : "warning"
                                }
                                size="small"
                                sx={{ mr: 2 }}
                              />

                              {!isPaid && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  endIcon={<ArrowForward />}
                                  onClick={() => handlePaymentClick(emi.id)}
                                  disabled={processing}
                                  sx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                    background:
                                      "linear-gradient(135deg, #3b82f6, #2563eb)",
                                  }}
                                >
                                  {isFailed ? "Retry Payment" : "Pay Now"}
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </Card>
                      </motion.div>
                    );
                  })}
                </Box>
              </motion.div>
            )}

            {paymentStep === "method" && (
              <motion.div
                key="method"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Pay EMI #{selectedEMI?.emiNumber}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Amount: <strong>₹{selectedEMI?.emiAmount}</strong>
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    Payment Methods
                  </Typography>

                  <Stack spacing={2}>
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          fullWidth
                          variant="outlined"
                          size="large"
                          startIcon={
                            <Avatar
                              src={method.icon}
                              sx={{
                                bgcolor: method.color,
                                width: 32,
                                height: 32,
                              }}
                            >
                              {method.short}
                            </Avatar>
                          }
                          onClick={() => handleMethodSelect(method.id)}
                          sx={{
                            justifyContent: "flex-start",
                            p: 2,
                            borderRadius: 2,
                            textTransform: "none",
                            borderColor:
                              selectedMethod === method.id
                                ? method.color
                                : "divider",
                            bgcolor:
                              selectedMethod === method.id
                                ? `${method.color}10`
                                : "background.paper",
                            "&:hover": {
                              borderColor: method.color,
                              bgcolor: `${method.color}08`,
                            },
                          }}
                        >
                          {method.name}
                        </Button>
                      </motion.div>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            )}

            {paymentStep === "bank" && (
              <motion.div
                key="bank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Select UPI App
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Amount: <strong>₹{selectedEMI?.emiAmount}</strong>
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={2}>
                    {paymentMethods
                      .find((m) => m.id === "upi")
                      ?.banks.map((bank) => (
                        <motion.div
                          key={bank.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            startIcon={
                              <Avatar
                                src={bank.icon}
                                sx={{
                                  bgcolor: "#5F259F",
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                {bank.short}
                              </Avatar>
                            }
                            onClick={() => handleBankSelect(bank.name)}
                            sx={{
                              justifyContent: "flex-start",
                              p: 2,
                              borderRadius: 2,
                              textTransform: "none",
                              borderColor:
                                selectedBank === bank.name
                                  ? "#5F259F"
                                  : "divider",
                              bgcolor:
                                selectedBank === bank.name
                                  ? "#5F259F10"
                                  : "background.paper",
                              "&:hover": {
                                borderColor: "#5F259F",
                                bgcolor: "#5F259F08",
                              },
                            }}
                          >
                            {bank.name}
                          </Button>
                        </motion.div>
                      ))}
                  </Stack>
                </Box>
              </motion.div>
            )}

            {paymentStep === "upi_verify" && (
              <motion.div
                key="upi_verify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Verify UPI ID
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Pay ₹{selectedEMI?.emiAmount} via {selectedBank}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <form onSubmit={handleUpiVerifySubmit}>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                      <Avatar
                        src={
                          paymentMethods
                            .find((m) => m.id === "upi")
                            ?.banks.find((b) => b.name === selectedBank)?.icon
                        }
                        sx={{
                          bgcolor: "#5F259F",
                          width: 56,
                          height: 56,
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        {selectedBank.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle1">
                        {selectedBank}
                      </Typography>
                    </Box>

                    <TextField
                      fullWidth
                      label="UPI ID"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="example@upi"
                      sx={{ mb: 3 }}
                      disabled={processing}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={!upiId || processing}
                      sx={{ borderRadius: 2, py: 1.5 }}
                    >
                      Verify UPI ID
                    </Button>
                  </form>
                </Box>
              </motion.div>
            )}

            {paymentStep === "upi_pin" && (
              <motion.div
                key="upi_pin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Enter UPI PIN
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Pay ₹{selectedEMI?.emiAmount} via {selectedBank}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <form onSubmit={handleUpiPinSubmit}>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                      <Avatar
                        src={
                          paymentMethods
                            .find((m) => m.id === "upi")
                            ?.banks.find((b) => b.name === selectedBank)?.icon
                        }
                        sx={{
                          bgcolor: "#5F259F",
                          width: 56,
                          height: 56,
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        {selectedBank.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle1">
                        {selectedBank}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        UPI ID: {upiId}
                      </Typography>
                    </Box>

                    <TextField
                      fullWidth
                      label="Enter UPI PIN"
                      type={showPin ? "text" : "password"}
                      value={upiPin}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 4) setUpiPin(val);
                      }}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        maxLength: 4,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPin(!showPin)}
                              edge="end"
                            >
                              {showPin ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                      disabled={processing}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={upiPin.length !== 4 || processing}
                      sx={{ borderRadius: 2, py: 1.5 }}
                    >
                      Pay ₹{selectedEMI?.emiAmount}
                    </Button>
                  </form>
                </Box>
              </motion.div>
            )}

            {paymentStep === "card" && (
              <motion.div
                key="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Card Payment
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Pay ₹{selectedEMI?.emiAmount}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <form onSubmit={handleCardSubmit}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      value={cardDetails.number}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setCardDetails((prev) => ({
                          ...prev,
                          number: formatted,
                        }));
                      }}
                      inputProps={{
                        maxLength: 19,
                      }}
                      sx={{ mb: 2 }}
                      placeholder="1234 5678 9012 3456"
                      disabled={processing}
                    />

                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Expiry (MM/YY)"
                        value={cardDetails.expiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          let formatted = val;
                          if (val.length > 2) {
                            formatted = `${val.substring(0, 2)}/${val.substring(
                              2,
                              4
                            )}`;
                          }
                          setCardDetails((prev) => ({
                            ...prev,
                            expiry: formatted,
                          }));
                        }}
                        inputProps={{
                          maxLength: 5,
                        }}
                        placeholder="MM/YY"
                        disabled={processing}
                      />
                      <TextField
                        fullWidth
                        label="CVV"
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (val.length <= 3) {
                            setCardDetails((prev) => ({
                              ...prev,
                              cvv: val,
                            }));
                          }
                        }}
                        inputProps={{
                          maxLength: 3,
                        }}
                        disabled={processing}
                      />
                    </Box>

                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      value={cardDetails.name}
                      onChange={(e) => {
                        setCardDetails((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                      sx={{ mb: 3 }}
                      placeholder="Name on card"
                      disabled={processing}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={
                        !cardDetails.number ||
                        !cardDetails.expiry ||
                        !cardDetails.cvv ||
                        !cardDetails.name ||
                        processing
                      }
                      sx={{ borderRadius: 2, py: 1.5 }}
                    >
                      Pay ₹{selectedEMI?.emiAmount}
                    </Button>
                  </form>
                </Box>
              </motion.div>
            )}

            {paymentStep === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 400,
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <CircularProgress size={80} thickness={2} sx={{ mb: 3 }} />
                  </motion.div>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Processing Payment...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please wait while we process your payment
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={
                        selectedMethod === "upi"
                          ? paymentMethods
                              .find((m) => m.id === "upi")
                              ?.banks.find((b) => b.name === selectedBank)?.icon
                          : paymentMethods.find((m) => m.id === selectedMethod)
                              ?.icon
                      }
                      sx={{
                        bgcolor:
                          selectedMethod === "upi" ? "#5F259F" : "#FF6B6B",
                        width: 24,
                        height: 24,
                        mr: 1,
                      }}
                    >
                      {selectedMethod === "upi"
                        ? selectedBank.charAt(0)
                        : selectedMethod.charAt(0)}
                    </Avatar>
                    <Typography variant="body2">
                      {selectedMethod === "upi"
                        ? selectedBank
                        : "Credit/Debit Card"}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            )}

            {paymentStep === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 400,
                    textAlign: "center",
                    p: 3,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(200, 247, 200, 0.1))'
                      : 'linear-gradient(135deg, #e0ffe0, #c8f7c8)',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <CheckCircle
                      sx={{
                        fontSize: 80,
                        color: "#4CAF50",
                        mb: 3,
                      }}
                    />
                  </motion.div>
                  <Typography variant="h5" gutterBottom>
                    Payment Successful!
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    ₹{selectedEMI?.emiAmount} paid via{" "}
                    {selectedMethod === "upi" ? selectedBank : "Card"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    EMI #{selectedEMI?.emiNumber} cleared
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Closing in {countdown} seconds...
                  </Typography>
                </Box>
              </motion.div>
            )}

            {paymentStep === "failure" && (
              <motion.div
                key="failure"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 400,
                    textAlign: "center",
                    p: 3,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(255, 205, 210, 0.1))'
                      : 'linear-gradient(135deg, #ffe0e0, #ffc8c8)',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <ErrorOutline
                      sx={{
                        fontSize: 80,
                        color: "#F44336",
                        mb: 3,
                      }}
                    />
                  </motion.div>
                  <Typography variant="h5" gutterBottom>
                    Payment Failed
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Failed to pay ₹{selectedEMI?.emiAmount} via{" "}
                    {selectedMethod === "upi" ? selectedBank : "Card"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, maxWidth: 400 }}
                  >
                    Reason: {failureReason}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleRetryPayment}
                    sx={{ mb: 2, borderRadius: 2 }}
                  >
                    Retry Payment
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    Closing in {countdown} seconds...
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        {paymentStep === "method" && (
          <Button onClick={resetPaymentFlow} variant="outlined">
            Back
          </Button>
        )}
        {(paymentStep === "bank" ||
          paymentStep === "upi_verify" ||
          paymentStep === "upi_pin" ||
          paymentStep === "card") && (
          <Button onClick={() => setPaymentStep("method")} variant="outlined">
            Change Method
          </Button>
        )}
      </DialogActions>

      <Backdrop
        open={processing}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default EmiDialog;
