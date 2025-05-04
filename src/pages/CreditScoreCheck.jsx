// In CreditScoreCheck.jsx
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CreditScoreCheck() {
  const [panNumber, setPanNumber] = useState("");
  const [creditScore, setCreditScore] = useState(null);
  const [error, setError] = useState("");

  const validatePanNumber = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const calculateCreditScore = (pan) => {
    const upperPan = pan.toUpperCase();
    let hash = 0;
    for (let i = 0; i < upperPan.length; i++) {
      hash = (hash << 5) - hash + upperPan.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    const absHash = Math.abs(hash);
    return 550 + (absHash % 301); // Range: 550 to 850
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setCreditScore(null);

    if (!validatePanNumber(panNumber)) {
      setError("Please enter a valid PAN number (e.g., ABCDE1234F)");
      toast.error("Invalid PAN number");
      return;
    }

    const score = calculateCreditScore(panNumber);
    setCreditScore(score);
    localStorage.setItem("hasCheckedCreditScore", "true");
    localStorage.setItem("creditScore", score);
    window.dispatchEvent(new Event("storage"));
    toast.success("Credit score calculated!");
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Check Your Credit Score
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="PAN Card Number"
              name="panNumber"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
              placeholder="e.g., ABCDE1234F"
              inputProps={{ maxLength: 10 }}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Check Score
            </Button>
          </Box>

          {creditScore !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                  Your Estimated Credit Score: {creditScore}
                </Typography>
                <Typography
                  variant="body1"
                  color={creditScore < 600 ? "error" : "success.main"}
                >
                  {creditScore < 600
                    ? "This score may affect your loan eligibility. Consider improving your financial profile."
                    : "Great score! You’re likely eligible to apply for a loan."}
                </Typography>

                {creditScore >= 600 && (
                  <Button variant="outlined" component={Link} to="/apply-loan" sx={{ mt: 2 }}>
                    Apply for a Loan
                  </Button>
                )}
              </Box>
            </motion.div>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Typography
            variant="caption"
            display="block"
            align="center"
            sx={{ mt: 2, color: "text.secondary" }}
          >
            Note: This is a simulated score for informational purposes, not an
            official credit report.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}

export default CreditScoreCheck;
