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
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
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

const guides = [
  {
    title: "Loan Application Guide",
    icon: <ArticleIcon sx={{ color: "#2196F3" }} />,
    description: "Complete guide to applying for loans with step-by-step instructions",
    content: [
      "Understanding different types of loans",
      "Document preparation checklist",
      "Application process walkthrough",
      "Common mistakes to avoid",
      "Tips for faster approval",
      "Post-approval procedures",
      "Loan disbursement process",
      "Repayment planning"
    ],
    resources: [
      "Document checklist PDF",
      "Application form templates",
      "Video tutorials",
      "FAQs"
    ]
  },
  {
    title: "Financial Planning Guide",
    icon: <TrendingUpIcon sx={{ color: "#2196F3" }} />,
    description: "Comprehensive guide to financial planning and wealth management",
    content: [
      "Setting financial goals",
      "Budgeting strategies",
      "Investment planning",
      "Retirement planning",
      "Tax planning",
      "Insurance planning",
      "Estate planning",
      "Risk management"
    ],
    resources: [
      "Financial planning templates",
      "Investment calculators",
      "Planning worksheets",
      "Expert advice"
    ]
  },
  {
    title: "Credit Management Guide",
    icon: <ChecklistIcon sx={{ color: "#2196F3" }} />,
    description: "Essential guide to managing and improving your credit",
    content: [
      "Understanding credit scores",
      "Building good credit",
      "Credit card management",
      "Debt management",
      "Credit report analysis",
      "Credit improvement tips",
      "Loan application strategies",
      "Credit monitoring"
    ],
    resources: [
      "Credit score simulator",
      "Debt repayment calculator",
      "Credit monitoring tools",
      "Improvement guides"
    ]
  },
  {
    title: "Success Stories",
    icon: <EmojiEventsIcon sx={{ color: "#2196F3" }} />,
    description: "Inspiring stories of financial success and transformation",
    content: [
      "Small business success stories",
      "Personal finance transformations",
      "Investment success stories",
      "Debt-free journeys",
      "Retirement planning success",
      "Wealth creation stories",
      "Financial independence stories",
      "Business growth stories"
    ],
    resources: [
      "Case studies",
      "Video testimonials",
      "Success metrics",
      "Learning resources"
    ]
  }
];

const articles = [
  {
    title: "Understanding Loan Types",
    category: "Loans",
    content: "A comprehensive guide to different types of loans available for professionals and businesses. Learn about personal loans, business loans, home loans, and specialized loan products. Understand the features, benefits, and eligibility criteria for each loan type to make informed borrowing decisions.",
    readTime: "5 min read",
    date: "2024-03-15"
  },
  {
    title: "Credit Score Management",
    category: "Credit",
    content: "Expert tips and strategies to maintain and improve your credit score. Learn about credit score factors, monitoring techniques, and best practices for credit management. Discover how to build a strong credit history and maintain a healthy credit profile.",
    readTime: "4 min read",
    date: "2024-03-10"
  },
  {
    title: "Financial Planning for Professionals",
    category: "Planning",
    content: "A detailed guide to financial planning for working professionals. Learn about budgeting, saving, investing, and retirement planning. Understand how to create a comprehensive financial plan that aligns with your career goals and personal aspirations.",
    readTime: "6 min read",
    date: "2024-03-05"
  },
  {
    title: "Business Growth Strategies",
    category: "Business",
    content: "Effective strategies to grow your business with proper financial planning. Learn about funding options, expansion strategies, and financial management techniques. Discover how to leverage financial resources for sustainable business growth.",
    readTime: "7 min read",
    date: "2024-03-01"
  }
];

const GuidesArticles = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      id="guides-articles-section"
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
              Guides & Articles
            </GradientText>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              Comprehensive guides and informative articles to help you make informed financial decisions.
            </Typography>
          </Box>

          {/* Guides Section */}
          <Box mb={8}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Comprehensive Guides
            </Typography>
            <Grid container spacing={4}>
              {guides.map((guide, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard>
                      <Box display="flex" alignItems="center" mb={2}>
                        {guide.icon}
                        <Typography variant="h5" component="h2" ml={2}>
                          {guide.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" mb={2}>
                        {guide.description}
                      </Typography>
                      <List>
                        {guide.content.map((item, i) => (
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
                          {guide.resources.map((resource, i) => (
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
                        View Guide
                      </Button>
                    </GlassCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Articles Section */}
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Informative Articles
            </Typography>
            <Grid container spacing={4}>
              {articles.map((article, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {article.title}
                      </Typography>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="body2" color="primary" mr={2}>
                          {article.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {article.readTime} • {new Date(article.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {article.content}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                          color: "white",
                          "&:hover": {
                            background: "linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)",
                          },
                        }}
                      >
                        Read Article
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
              For more detailed guides and articles, please contact our support team.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default GuidesArticles; 