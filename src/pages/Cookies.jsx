import React from "react";
import { Box, Container, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import CookieIcon from "@mui/icons-material/Cookie";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255,255,255,0.95)",
  borderRadius: 24,
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
  padding: theme.spacing(5, 4),
  maxWidth: 800,
  margin: "auto",
}));

const Cookies = () => (
  <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", py: 8 }}>
    <Container maxWidth="md">
      <StyledPaper>
        <Box display="flex" alignItems="center" mb={3}>
          <CookieIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" fontWeight="bold">Cookies Policy</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" mb={3}>
          We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can manage your cookie preferences at any time.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <List>
          <ListItem>
            <ListItemIcon><CookieIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Essential cookies for site functionality" />
          </ListItem>
          <ListItem>
            <ListItemIcon><SecurityIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Security and authentication cookies" />
          </ListItem>
          <ListItem>
            <ListItemIcon><SettingsIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Preference and analytics cookies" />
          </ListItem>
        </List>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary">
          For more information or to change your cookie settings, contact us at <b>privacy@fintechfinance.in</b>.
        </Typography>
      </StyledPaper>
    </Container>
  </Box>
);

export default Cookies; 