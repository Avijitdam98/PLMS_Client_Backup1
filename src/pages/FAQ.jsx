import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const GradientText = styled(Typography)({
  background: 'linear-gradient(90deg, #00c6fb 0%, #005bea 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
});

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px !important',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  marginBottom: '16px !important',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: '0 0 16px 0 !important',
  },
}));

const faqCategories = [
  {
    title: 'General Questions',
    questions: [
      {
        question: 'What types of loans do you offer?',
        answer: 'We offer a wide range of loans including business loans, education loans, medical practice loans, architect loans, engineering loans, and professional practice loans. Each loan type is specifically designed to meet the unique needs of different professionals.',
      },
      {
        question: 'What is the minimum and maximum loan amount?',
        answer: 'Our loan amounts range from ₹1,00,000 to ₹2,00,00,000, depending on the type of loan and your eligibility. The exact amount will be determined based on your income, credit score, and other factors.',
      },
      {
        question: 'What is the interest rate on your loans?',
        answer: 'Interest rates vary based on the loan type, amount, and tenure. We offer competitive rates starting from 8.5% per annum. The exact rate will be communicated after evaluating your application.',
      },
    ],
  },
  {
    title: 'Application Process',
    questions: [
      {
        question: 'What documents are required for loan application?',
        answer: 'Required documents include: PAN card, Aadhaar card, proof of income (salary slips/bank statements), address proof, and professional qualification certificates. Additional documents may be required based on the loan type.',
      },
      {
        question: 'How long does the loan approval process take?',
        answer: 'Our loan approval process typically takes 24-48 hours after submission of all required documents. We strive to provide quick approvals while maintaining thorough verification.',
      },
      {
        question: 'Can I apply for a loan online?',
        answer: 'Yes, you can apply for a loan through our online portal. The process is simple and secure. You can upload documents and track your application status online.',
      },
    ],
  },
  {
    title: 'Repayment & Charges',
    questions: [
      {
        question: 'What are the repayment options?',
        answer: 'We offer flexible repayment options including monthly, quarterly, and half-yearly installments. You can choose the option that best suits your cash flow.',
      },
      {
        question: 'Are there any prepayment charges?',
        answer: 'No, we don\'t charge any prepayment penalties. You can prepay your loan at any time without additional charges.',
      },
      {
        question: 'What happens if I miss an EMI payment?',
        answer: 'In case of a missed payment, we charge a late payment fee. However, we recommend contacting our customer service team immediately to discuss alternative arrangements.',
      },
    ],
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0A1929 0%, #132F4C 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        py: 8,
        color: theme.palette.text.primary,
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
              textAlign: 'center',
              mb: 8,
              px: { xs: 2, md: 0 },
            }}
          >
            <GradientText
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)'
                  : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Frequently Asked Questions
            </GradientText>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
              }}
            >
              Find answers to common questions about our loan products and services.
            </Typography>

            {/* Search Box */}
            <Box
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                position: 'relative',
                mb: 4,
              }}
            >
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  paddingLeft: '48px',
                  borderRadius: '50px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
              />
              <SearchIcon
                sx={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'text.secondary',
                }}
              />
            </Box>
          </Box>
        </motion.div>

        {/* FAQ Categories */}
        {filteredCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                color: 'primary.main',
                fontWeight: 700,
              }}
            >
              {category.title}
            </Typography>
            {category.questions.map((item, index) => (
              <StyledAccordion
                key={index}
                expanded={expanded === `panel${categoryIndex}-${index}`}
                onChange={handleChange(`panel${categoryIndex}-${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: expanded === `panel${categoryIndex}-${index}` ? 'primary.main' : 'text.primary',
                    }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                  >
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </motion.div>
        ))}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box
            sx={{
              mt: 8,
              p: 4,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Still Have Questions?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Our customer support team is here to help you 24/7.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                📞 +91 44 2345 6789
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                ✉️ support@fintechfinance.in
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
