import React from "react";
import { Box, Container, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import WorkIcon from "@mui/icons-material/Work";
import GavelIcon from "@mui/icons-material/Gavel";
import LockIcon from "@mui/icons-material/Lock";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HelpIcon from "@mui/icons-material/Help";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: "rgba(255,255,255,0.95)",
  borderRadius: 24,
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
  padding: theme.spacing(5, 4),
  maxWidth: 800,
  margin: "auto",
}));

const links = [
  { icon: <HomeIcon color="primary" />, text: "Home", to: "/" },
  { icon: <PersonAddIcon color="primary" />, text: "Sign Up", to: "/register" },
  { icon: <LoginIcon color="primary" />, text: "Sign In", to: "/login" },
  { icon: <InfoIcon color="primary" />, text: "About Us", to: "/about" },
  { icon: <WorkIcon color="primary" />, text: "Careers", to: "/careers" },
  { icon: <NewspaperIcon color="primary" />, text: "News & Events", to: "/news-events" },
  { icon: <ContactMailIcon color="primary" />, text: "Contact", to: "/contact" },
  { icon: <HelpIcon color="primary" />, text: "FAQ", to: "/faq" },
  { icon: <LockIcon color="primary" />, text: "Privacy Policy", to: "/privacy-policy" },
  { icon: <GavelIcon color="primary" />, text: "Terms of Service", to: "/terms-of-service" },
  { icon: <MapIcon color="primary" />, text: "Sitemap", to: "/sitemap" },
  { icon: <InfoIcon color="primary" />, text: "Accessibility", to: "/accessibility" },
  { icon: <LockIcon color="primary" />, text: "Cookies", to: "/cookies" },
  { icon: <WorkIcon color="primary" />, text: "Investor Relations", to: "/investor-relations" },
];

const Sitemap = () => (
  <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa", py: 8 }}>
    <Container maxWidth="md">
      <StyledPaper>
        <Box display="flex" alignItems="center" mb={3}>
          <MapIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" fontWeight="bold">Sitemap</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Explore all sections of our website. Click any link to navigate directly.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <List>
          {links.map((link, idx) => (
            <ListItem key={idx}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText>
                <Typography
                  component={Link}
                  to={link.to}
                  color="primary"
                  sx={{ textDecoration: 'none', fontWeight: 500 }}
                >
                  {link.text}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </StyledPaper>
    </Container>
  </Box>
);

export default Sitemap; 