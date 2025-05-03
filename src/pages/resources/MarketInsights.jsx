import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import NewspaperIcon from "@mui/icons-material/Newspaper";

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

const insights = [
  {
    title: "Interest Rate Trends",
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    description: "Stay updated with the latest interest rate movements and their impact on loans.",
    content: [
      "Current market rates",
      "Historical trends",
      "Future predictions",
      "Impact on different loan types",
    ],
  },
  {
    title: "Market Analysis Reports",
    icon: <BarChartIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    description: "Comprehensive analysis of the financial market and lending industry.",
    content: [
      "Quarterly market reports",
      "Industry benchmarks",
      "Competitor analysis",
      "Growth opportunities",
    ],
  },
  {
    title: "Economic Indicators",
    icon: <TimelineIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    description: "Key economic indicators that influence the lending market.",
    content: [
      "GDP growth rates",
      "Inflation trends",
      "Employment statistics",
      "Consumer confidence",
    ],
  },
  {
    title: "Industry News",
    icon: <NewspaperIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
    description: "Latest news and updates from the financial and lending industry.",
    content: [
      "Regulatory updates",
      "Industry innovations",
      "Success stories",
      "Expert opinions",
    ],
  },
];

const MarketInsights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      id="market-insights-section"
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
          <Box textAlign="center" mb={6}>
            <GradientText variant="h3" component="h1" gutterBottom>
              Market Insights
            </GradientText>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              Stay informed about the latest trends and developments in the financial market.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {insights.map((insight, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard>
                    <Box display="flex" alignItems="center" mb={2}>
                      {insight.icon}
                      <Typography variant="h5" component="h2" ml={2}>
                        {insight.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {insight.description}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {insight.content.map((item, i) => (
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
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        color: "white",
                        "&:hover": {
                          background: "linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)",
                        },
                      }}
                    >
                      View Details
                    </Button>
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
              For more detailed market insights, please contact our research team.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MarketInsights; 