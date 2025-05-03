// src/pages/Home.jsx
import { Box, Typography, useTheme } from "@mui/material";
import EligibilitySection from "../components/EligibilitySection";
import EmiCalculator from "../components/EmiCalculator";
import FaqSection from "../components/FaqSection";
import HeroSection from "../components/HeroSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Chatbot from "../components/Chatbot";

export default function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.background.default
          : '#f4f7fb',
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HeroSection />
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          color: theme.palette.mode === 'dark' 
            ? theme.palette.primary.light
            : '#005bea',
          fontWeight: 800,
          mb: 4,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 100,
            height: 3,
            backgroundColor: theme.palette.mode === 'dark'
              ? theme.palette.primary.main
              : '#00c6fb',
          },
        }}
      >
        EMI Calculator
      </Typography>
      <EmiCalculator />
      <EligibilitySection />
      <TestimonialsSection />
      <FaqSection />
      <Chatbot />
    </Box>
  );
}
