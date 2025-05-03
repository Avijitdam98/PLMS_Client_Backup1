import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import GavelIcon from "@mui/icons-material/Gavel";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SecurityIcon from "@mui/icons-material/Security";

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

const sections = [
  {
    title: "Loan Terms",
    icon: <AccountBalanceIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    content: [
      "Interest rates and payment schedules",
      "Loan eligibility criteria",
      "Repayment terms and conditions",
      "Late payment policies and penalties",
    ],
  },
  {
    title: "User Responsibilities",
    icon: <GavelIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    content: [
      "Accurate information provision",
      "Timely payment obligations",
      "Document maintenance requirements",
      "Communication responsibilities",
    ],
  },
  {
    title: "Security Measures",
    icon: <SecurityIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    content: [
      "Account security requirements",
      "Password protection guidelines",
      "Data confidentiality obligations",
      "System access restrictions",
    ],
  },
  {
    title: "Legal Compliance",
    icon: <DescriptionIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    content: [
      "Regulatory requirements",
      "Anti-fraud measures",
      "Compliance with laws",
      "Dispute resolution procedures",
    ],
  },
];

const TermsOfService = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: theme.palette.mode === 'dark' 
        ? theme.palette.background.default
        : '#f5f5f5', 
      py: 8 
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box textAlign="center" mb={6}>
            <GradientText variant="h3" component="h1" gutterBottom>
              Terms of Service
            </GradientText>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              Please read these terms carefully before using our loan management services.
              By accessing our platform, you agree to be bound by these terms.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {sections.map((section, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard>
                    <Box display="flex" alignItems="center" mb={2}>
                      {section.icon}
                      <Typography variant="h5" component="h2" ml={2}>
                        {section.title}
                      </Typography>
                    </Box>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {section.content.map((item, i) => (
                        <Typography
                          component="li"
                          key={i}
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box mt={6} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              For any questions regarding our terms of service, please contact our legal team.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TermsOfService; 