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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import CalculateIcon from "@mui/icons-material/Calculate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssessmentIcon from "@mui/icons-material/Assessment";

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

const educationModules = [
  {
    title: "Personal Finance Basics",
    icon: <AccountBalanceIcon sx={{ color: "#2196F3" }} />,
    description: "Learn the fundamentals of personal finance management",
    content: [
      "Budgeting and expense tracking",
      "Saving strategies and emergency funds",
      "Understanding income and expenses",
      "Financial goal setting",
      "Basic investment concepts",
      "Tax planning basics",
      "Insurance fundamentals",
      "Retirement planning introduction"
    ],
    resources: [
      "Budgeting templates",
      "Expense tracking tools",
      "Financial planning worksheets",
      "Interactive calculators"
    ]
  },
  {
    title: "Investment Fundamentals",
    icon: <TrendingUpIcon sx={{ color: "#2196F3" }} />,
    description: "Master the basics of investing and wealth creation",
    content: [
      "Understanding different investment types",
      "Risk and return concepts",
      "Portfolio diversification",
      "Market analysis basics",
      "Investment strategies",
      "Long-term wealth building",
      "Tax-efficient investing",
      "Investment monitoring"
    ],
    resources: [
      "Investment calculators",
      "Portfolio trackers",
      "Market analysis tools",
      "Investment guides"
    ]
  },
  {
    title: "Credit Management",
    icon: <CreditCardIcon sx={{ color: "#2196F3" }} />,
    description: "Learn how to manage and improve your credit effectively",
    content: [
      "Understanding credit scores",
      "Credit report analysis",
      "Debt management strategies",
      "Credit card management",
      "Loan application process",
      "Credit improvement tips",
      "Credit monitoring",
      "Identity theft prevention"
    ],
    resources: [
      "Credit score simulators",
      "Debt repayment calculators",
      "Credit monitoring tools",
      "Improvement guides"
    ]
  },
  {
    title: "Financial Planning",
    icon: <SavingsIcon sx={{ color: "#2196F3" }} />,
    description: "Comprehensive guide to financial planning and wealth management",
    content: [
      "Setting financial goals",
      "Creating a financial plan",
      "Retirement planning",
      "Tax planning strategies",
      "Insurance planning",
      "Estate planning",
      "Wealth preservation",
      "Financial independence"
    ],
    resources: [
      "Financial planning templates",
      "Retirement calculators",
      "Tax planning tools",
      "Wealth management guides"
    ]
  },
  {
    title: "Risk Management",
    icon: <SecurityIcon sx={{ color: "#2196F3" }} />,
    description: "Learn how to protect your financial future",
    content: [
      "Understanding financial risks",
      "Insurance types and coverage",
      "Emergency fund planning",
      "Investment risk management",
      "Business risk assessment",
      "Personal risk management",
      "Financial security planning",
      "Crisis management"
    ],
    resources: [
      "Risk assessment tools",
      "Insurance calculators",
      "Emergency planning guides",
      "Security checklists"
    ]
  }
];

const learningResources = [
  {
    title: "Financial Calculators",
    icon: <CalculateIcon sx={{ color: "#2196F3" }} />,
    description: "Interactive tools for financial calculations",
    tools: [
      "Loan calculator",
      "Investment calculator",
      "Retirement planner",
      "Budget calculator"
    ]
  },
  {
    title: "Interactive Tools",
    icon: <AssessmentIcon sx={{ color: "#2196F3" }} />,
    description: "Engaging tools for financial learning",
    tools: [
      "Financial health check",
      "Investment simulator",
      "Budget planner",
      "Debt repayment calculator"
    ]
  },
  {
    title: "Learning Materials",
    icon: <MenuBookIcon sx={{ color: "#2196F3" }} />,
    description: "Comprehensive educational resources",
    tools: [
      "E-books and guides",
      "Worksheets and templates",
      "Case studies",
      "Research papers"
    ]
  },
  {
    title: "Video Resources",
    icon: <VideoLibraryIcon sx={{ color: "#2196F3" }} />,
    description: "Visual learning resources",
    tools: [
      "Educational videos",
      "Webinar recordings",
      "Tutorial series",
      "Expert interviews"
    ]
  }
];

const FinancialEducation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      id="financial-education-section"
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
              Financial Education
            </GradientText>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              Comprehensive financial education resources to help you make informed decisions and achieve your financial goals.
            </Typography>
          </Box>

          {/* Education Modules Section */}
          <Box mb={8}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Education Modules
            </Typography>
            <Grid container spacing={4}>
              {educationModules.map((module, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard>
                      <Box display="flex" alignItems="center" mb={2}>
                        {module.icon}
                        <Typography variant="h5" component="h2" ml={2}>
                          {module.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" mb={2}>
                        {module.description}
                      </Typography>
                      <List>
                        {module.content.map((item, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <SchoolIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                      <Box mt={2}>
                        <Typography variant="subtitle1" gutterBottom>
                          Available Resources:
                        </Typography>
                        <List dense>
                          {module.resources.map((resource, i) => (
                            <ListItem key={i}>
                              <ListItemText primary={resource} />
                            </ListItem>
                          ))}
                        </List>
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
                        Start Learning
                      </Button>
                    </GlassCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Learning Resources Section */}
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Learning Resources
            </Typography>
            <Grid container spacing={4}>
              {learningResources.map((resource, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard>
                      <Box display="flex" alignItems="center" mb={2}>
                        {resource.icon}
                        <Typography variant="h5" component="h2" ml={2}>
                          {resource.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" mb={2}>
                        {resource.description}
                      </Typography>
                      <List>
                        {resource.tools.map((tool, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <SchoolIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={tool} />
                          </ListItem>
                        ))}
                      </List>
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
                        Explore
                      </Button>
                    </GlassCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Footer Information */}
          <Box mt={6} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              For personalized financial education guidance, please contact our education team.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FinancialEducation; 