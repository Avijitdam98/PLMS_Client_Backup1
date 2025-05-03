import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Divider, useTheme } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import GavelIcon from '@mui/icons-material/Gavel';
import { styled } from '@mui/material/styles';

// Styled components for better image handling
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: 40,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  },
}));

const PrivacyPolicy = () => {
  const theme = useTheme();

const sections = [
  {
      title: "Information We Collect",
      icon: <DataUsageIcon />,
    content: [
        "Personal information (name, email, phone number)",
        "Financial information (income, employment details)",
        "Identification documents",
        "Credit history and score",
        "Device and usage information"
      ]
  },
  {
      title: "How We Use Your Information",
      icon: <LockIcon />,
    content: [
        "Process your loan applications",
        "Verify your identity and creditworthiness",
        "Communicate with you about your account",
        "Improve our services and user experience",
        "Comply with legal obligations"
      ]
  },
  {
      title: "Data Security",
      icon: <SecurityIcon />,
    content: [
        "Encryption of sensitive data",
        "Regular security audits",
        "Access controls and authentication",
        "Secure data storage and transmission",
        "Employee training on data protection"
      ]
  },
  {
      title: "Your Rights",
      icon: <GavelIcon />,
    content: [
        "Access your personal information",
        "Correct inaccurate data",
        "Request data deletion",
        "Opt-out of marketing communications",
        "File a complaint"
      ]
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <StyledPaper>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              mb: 4
            }}
          >
              Privacy Policy
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            paragraph 
            align="center"
            sx={{ mb: 4 }}
          >
            Last Updated: March 15, 2024
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography 
              variant="body1" 
              paragraph
              sx={{
                color: 'text.primary',
                lineHeight: 1.8,
                mb: 4
              }}
            >
              At FinTech Finance, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our services. Please read this privacy 
              policy carefully. If you do not agree with the terms of this privacy policy, please do not access 
              the site.
            </Typography>

            {sections.map((section, index) => (
              <Box key={index} sx={{ mt: 4 }}>
                <IconWrapper>
                      {section.icon}
                  <Typography 
                    variant="h5" 
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.primary.main
                    }}
                  >
                        {section.title}
                      </Typography>
                </IconWrapper>
                <List>
                  {section.content.map((item, itemIndex) => (
                    <ListItem 
                      key={itemIndex} 
                      sx={{ 
                        pl: 4,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          borderRadius: 1
                        }
                      }}
                    >
                      <ListItemText 
                        primary={item}
                        primaryTypographyProps={{
                          sx: {
                            color: 'text.primary',
                            fontSize: '1rem',
                            lineHeight: 1.6
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                {index < sections.length - 1 && (
                  <Divider 
                    sx={{ 
                      my: 3,
                      borderColor: 'rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                )}
                    </Box>
            ))}

            <Box 
              sx={{ 
                mt: 6,
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.02)'
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  mb: 2
                }}
              >
                Contact Us
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ mb: 2 }}
              >
                If you have any questions about this Privacy Policy, please contact us at:
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1
                }}
              >
                Email: privacy@fintechfinance.in
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1
                }}
              >
                Phone: +91 44 2345 6789
            </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                Address: FinTech Finance Ltd, 21, Patullos Road, Chennai - 600002, India
            </Typography>
            </Box>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy; 