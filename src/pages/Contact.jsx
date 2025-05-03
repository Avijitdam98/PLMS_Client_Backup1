import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { LocationOn, Phone, Email, AccessTime } from "@mui/icons-material";

const GradientText = styled(Typography)({
  background: "linear-gradient(90deg, #00c6fb 0%, #005bea 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
});

const GlassCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  height: "100%",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
  },
}));

const contactInfo = [
  {
    icon: <LocationOn />,
    title: "Our Location",
    content: "FinTech Finance Ltd, 21, Patullos Road, Chennai - 600002, India",
    link: "https://goo.gl/maps/MhnEXzDsH3BsUeKj6",
  },
  {
    icon: <Phone />,
    title: "Phone Number",
    content: "+91 44 2345 6789",
    link: "tel:+914423456789",
  },
  {
    icon: <Email />,
    title: "Email Address",
    content: "info@fintechfinance.in",
    link: "mailto:info@fintechfinance.in",
  },
  {
    icon: <AccessTime />,
    title: "Working Hours",
    content: "Monday - Saturday: 9:00 AM - 6:00 PM",
    link: null,
  },
];

export default function Contact() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: 8,
              px: { xs: 2, md: 0 },
            }}
          >
            <GradientText
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                mb: 2,
              }}
            >
              Contact Us
            </GradientText>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: "800px",
                mx: "auto",
                mb: 4,
              }}
            >
              Have questions? We're here to help. Reach out to us through any of
              the following channels.
            </Typography>
          </Box>
        </motion.div>

        {/* Contact Info Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard>
                  <CardContent
                    sx={{
                      p: 3,
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        mb: 2,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {info.title}
                    </Typography>
                    {info.link ? (
                      <Typography
                        component="a"
                        href={info.link}
                        target="_blank"
                        rel="noopener"
                        sx={{
                          color: "text.secondary",
                          textDecoration: "none",
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {info.content}
                      </Typography>
                    ) : (
                      <Typography color="text.secondary">
                        {info.content}
                      </Typography>
                    )}
                  </CardContent>
                </GlassCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Map Section */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard>
                <CardContent sx={{ p: 0, height: "100%" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5989191057134!2d80.2822!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjgiTiA4MMKwMTYnNTUuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      borderRadius: "20px",
                      minHeight: "400px",
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </CardContent>
              </GlassCard>
            </motion.div>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
