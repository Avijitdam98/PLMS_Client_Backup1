import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import CookieIcon from "@mui/icons-material/Cookie";

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
    title: "Information Collection",
    icon: <DataUsageIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    content: [
      "Personal information (name, contact details, financial information)",
      "Loan application details and supporting documents",
      "Credit history and financial records",
      "Communication preferences and interaction history",
    ],
  },
  {
    title: "Data Security",
    icon: <SecurityIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    content: [
      "Advanced encryption for data transmission",
      "Secure storage systems with regular backups",
      "Access controls and authentication measures",
      "Regular security audits and updates",
    ],
  },
  {
    title: "Information Usage",
    icon: <LockIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    content: [
      "Processing loan applications and requests",
      "Improving our services and user experience",
      "Sending important updates and notifications",
      "Compliance with legal requirements",
    ],
  },
  {
    title: "Cookies and Tracking",
    icon: <CookieIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    content: [
      "Essential cookies for website functionality",
      "Analytics to improve user experience",
      "Security cookies to protect your data",
      "Preference cookies for personalized settings",
    ],
  },
];

const PrivacyPolicy = () => {
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
              Privacy Policy
            </GradientText>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              We are committed to protecting your privacy and ensuring the security of your personal information.
              This policy outlines how we collect, use, and safeguard your data.
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
              For any questions regarding our privacy policy, please contact our support team.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy; 