import React from "react";
import { Box, Container, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import HearingIcon from "@mui/icons-material/Hearing";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255,255,255,0.95)",
  borderRadius: 24,
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
  padding: theme.spacing(5, 4),
  maxWidth: 800,
  margin: "auto",
}));

const Accessibility = () => (
  <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", py: 8 }}>
    <Container maxWidth="md">
      <StyledPaper>
        <Box display="flex" alignItems="center" mb={3}>
          <AccessibilityNewIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" fontWeight="bold">Accessibility</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" mb={3}>
          We are committed to making our platform accessible to everyone, including people with disabilities. Our goal is to provide a seamless, inclusive experience for all users.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <List>
          <ListItem>
            <ListItemIcon><VisibilityIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Screen reader compatibility and alt text for images" />
          </ListItem>
          <ListItem>
            <ListItemIcon><HearingIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Keyboard navigation and accessible forms" />
          </ListItem>
          <ListItem>
            <ListItemIcon><PhoneInTalkIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Support for users with visual, hearing, or mobility impairments" />
          </ListItem>
        </List>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary">
          If you encounter any accessibility barriers or need assistance, please contact our support team at <b>accessibility@fintechfinance.in</b> or call <b>+91 44 2345 6789</b>.
        </Typography>
      </StyledPaper>
    </Container>
  </Box>
);

export default Accessibility; 