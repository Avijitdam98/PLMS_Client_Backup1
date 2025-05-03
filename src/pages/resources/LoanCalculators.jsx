import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  Button,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import CalculateIcon from "@mui/icons-material/Calculate";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";

const GradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const calculators = [
  {
    title: "EMI Calculator",
    icon: <CalculateIcon sx={{ color: "#2196F3" }} />,
    description: "Calculate your monthly loan payments based on loan amount, interest rate, and tenure",
    fields: [
      { label: "Loan Amount", type: "number", min: 10000, max: 10000000, step: 10000 },
      { label: "Interest Rate", type: "number", min: 1, max: 20, step: 0.1 },
      { label: "Loan Tenure", type: "number", min: 1, max: 30, step: 1 },
    ],
    result: "Monthly EMI: ₹",
  },
  {
    title: "Loan Eligibility Checker",
    icon: <AccountBalanceIcon sx={{ color: "#2196F3" }} />,
    description: "Check your eligibility for different types of loans based on your income and expenses",
    fields: [
      { label: "Monthly Income", type: "number", min: 10000, max: 1000000, step: 10000 },
      { label: "Monthly Expenses", type: "number", min: 5000, max: 500000, step: 5000 },
      { label: "Existing EMIs", type: "number", min: 0, max: 100000, step: 1000 },
    ],
    result: "Maximum Loan Amount: ₹",
  },
  {
    title: "Business Loan Calculator",
    icon: <BusinessIcon sx={{ color: "#2196F3" }} />,
    description: "Calculate business loan requirements and repayment schedule",
    fields: [
      { label: "Business Turnover", type: "number", min: 100000, max: 10000000, step: 100000 },
      { label: "Business Age", type: "number", min: 1, max: 20, step: 1 },
      { label: "Required Loan Amount", type: "number", min: 100000, max: 5000000, step: 100000 },
    ],
    result: "Recommended Loan Amount: ₹",
  },
  {
    title: "Education Loan Calculator",
    icon: <SchoolIcon sx={{ color: "#2196F3" }} />,
    description: "Plan your education loan and calculate repayment options",
    fields: [
      { label: "Course Fee", type: "number", min: 100000, max: 5000000, step: 100000 },
      { label: "Duration of Course", type: "number", min: 1, max: 5, step: 0.5 },
      { label: "Moratorium Period", type: "number", min: 0, max: 2, step: 0.5 },
    ],
    result: "Total Repayment Amount: ₹",
  },
];

const LoanCalculators = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [values, setValues] = useState({});
  const [results, setResults] = useState({});

  const handleInputChange = (calculatorIndex, fieldIndex, value) => {
    setValues((prev) => ({
      ...prev,
      [`${calculatorIndex}-${fieldIndex}`]: value,
    }));
  };

  const calculateResult = (calculatorIndex) => {
    const calculator = calculators[calculatorIndex];
    const fieldValues = calculator.fields.map((_, i) => values[`${calculatorIndex}-${i}`] || 0);

    switch (calculatorIndex) {
      case 0: // EMI Calculator
        const [principal, rate, time] = fieldValues;
        const monthlyRate = rate / 12 / 100;
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, time * 12) / (Math.pow(1 + monthlyRate, time * 12) - 1);
        return Math.round(emi);
      case 1: // Loan Eligibility
        const [income, expenses, existingEMIs] = fieldValues;
        const disposableIncome = income - expenses - existingEMIs;
        return Math.round(disposableIncome * 50); // Assuming 50% of disposable income can be used for EMI
      case 2: // Business Loan
        const [turnover, age, required] = fieldValues;
        const eligibleAmount = Math.min(turnover * 0.2, required); // Assuming 20% of turnover
        return Math.round(eligibleAmount);
      case 3: // Education Loan
        const [fee, duration, moratorium] = fieldValues;
        const totalAmount = fee * (1 + 0.1 * (duration + moratorium)); // Assuming 10% interest
        return Math.round(totalAmount);
      default:
        return 0;
    }
  };

  const handleCalculate = (calculatorIndex) => {
    const result = calculateResult(calculatorIndex);
    setResults((prev) => ({
      ...prev,
      [calculatorIndex]: result,
    }));
  };

  return (
    <Box
      id="loan-calculators-section"
      sx={{
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
        py: 8,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <Box textAlign="center" mb={6}>
            <GradientText variant="h3" component="h1" gutterBottom>
              Loan Calculators
            </GradientText>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              Use our interactive calculators to plan your loans and understand your repayment options.
            </Typography>
          </Box>

          {/* Calculators Section */}
          <Grid container spacing={4}>
            {calculators.map((calculator, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard>
                    <Box display="flex" alignItems="center" mb={2}>
                      {calculator.icon}
                      <Typography variant="h5" component="h2" ml={2}>
                        {calculator.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                      {calculator.description}
                    </Typography>
                    <Grid container spacing={2}>
                      {calculator.fields.map((field, fieldIndex) => (
                        <Grid item xs={12} key={fieldIndex}>
                          <TextField
                            fullWidth
                            label={field.label}
                            type="number"
                            value={values[`${index}-${fieldIndex}`] || ""}
                            onChange={(e) => handleInputChange(index, fieldIndex, parseFloat(e.target.value))}
                            InputProps={{
                              inputProps: {
                                min: field.min,
                                max: field.max,
                                step: field.step,
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <Box mt={3}>
                      <Button
                        variant="contained"
                        onClick={() => handleCalculate(index)}
                        sx={{
                          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                          color: "white",
                          "&:hover": {
                            background: "linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)",
                          },
                        }}
                      >
                        Calculate
                      </Button>
                      {results[index] !== undefined && (
                        <Typography variant="h6" mt={2}>
                          {calculator.result} {results[index].toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Additional Information Section */}
          <Box mt={6}>
            <Typography variant="h4" gutterBottom>
              Loan Calculator Tips
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <GlassCard>
                  <Typography variant="h6" gutterBottom>
                    Understanding EMI
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    EMI (Equated Monthly Installment) is the amount you pay monthly to repay your loan. It includes both principal and interest components. Use our EMI calculator to understand your monthly obligations.
                  </Typography>
                </GlassCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <GlassCard>
                  <Typography variant="h6" gutterBottom>
                    Loan Eligibility Factors
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Your loan eligibility depends on various factors including income, credit score, existing loans, and repayment capacity. Use our eligibility calculator to estimate your borrowing capacity.
                  </Typography>
                </GlassCard>
              </Grid>
            </Grid>
          </Box>

          {/* Footer Information */}
          <Box mt={6} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              For personalized loan advice, please contact our loan specialists.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoanCalculators; 