// src/components/FooterSection.jsx
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import TwitterIcon from "@mui/icons-material/Twitter";
import VerifiedIcon from "@mui/icons-material/Verified";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Styled components
const GradientText = styled(Typography)({
  background: "linear-gradient(90deg, #ffffff 0%, #b6c9f0 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
});

const ModernIconButton = styled(IconButton)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "14px",
  padding: "12px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background:
      "linear-gradient(90deg, rgba(0, 198, 251, 0.1) 0%, rgba(0, 91, 234, 0.2) 100%)",
    transform: "translateY(-4px)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
  },
}));

const GlowingLink = styled(MuiLink)({
  color: "#e0e8f3",
  fontWeight: 500,
  fontSize: "1rem",
  transition: "all 0.3s",
  position: "relative",
  padding: "4px 0",
  "&:hover": {
    color: "#ffffff",
    textShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
    "&::after": {
      width: "100%",
      opacity: 1,
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "2px",
    background: "linear-gradient(90deg, #00c6fb 0%, #005bea 100%)",
    transition: "all 0.3s ease",
    opacity: 0,
    borderRadius: "3px",
  },
});

const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: theme.spacing(3),
  border: "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.06)",
    transform: "translateY(-5px)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
  },
}));

const FloatingInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    color: "#ffffff",
    transition: "all 0.3s ease",
    overflow: "hidden",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
    },
    "&.Mui-focused": {
      background: "rgba(255, 255, 255, 0.15)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    padding: "15px 20px",
  },
});

const FloatingButton = styled(Button)({
  borderRadius: "50px",
  padding: "12px 30px",
  background: "linear-gradient(90deg, #00c6fb 0%, #005bea 100%)",
  color: "#ffffff",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 10px 25px rgba(0, 91, 234, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "linear-gradient(90deg, #00a6fb 0%, #0046ea 100%)",
    boxShadow: "0 15px 30px rgba(0, 91, 234, 0.6)",
    transform: "translateY(-3px)",
  },
});

const infoItems = [
  {
    icon: <LocationOnIcon />,
    text: "FinTech Finance Ltd, 21, Patullos Road, Chennai - 600002, India",
    link: "https://goo.gl/maps/MhnEXzDsH3BsUeKj6",
  },
  {
    icon: <PhoneIcon />,
    text: "+91 44 2345 6789",
    link: "tel:+914423456789",
  },
  {
    icon: <EmailIcon />,
    text: "info@fintechfinance.in",
    link: "mailto:info@fintechfinance.in",
  },
];

const socialLinks = [
  {
    icon: <FacebookIcon />,
    url: "https://www.facebook.com/FinTechFinanceOfficial",
    color: "#1877F2",
  },
  {
    icon: <TwitterIcon />,
    url: "https://twitter.com/FinTechFinance",
    color: "#1DA1F2",
  },
  {
    icon: <LinkedInIcon />,
    url: "https://www.linkedin.com/company/FinTech-finance-limited/",
    color: "#0A66C2",
  },
  {
    icon: <YouTubeIcon />,
    url: "https://www.youtube.com/user/FinTechFinanceLtd",
    color: "#FF0000",
  },
];

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Apply for Loan", path: "/apply-loan" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact Us", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms of Service", path: "/terms-of-service" },
];

const resourceLinks = [
  {
    text: "Investor Relations",
    url: "/investor-relations",
    isExternal: false,
  },
  {
    text: "Careers",
    url: "/careers",
    isExternal: false,
  },
  {
    text: "News & Events",
    url: "/news-events",
    isExternal: false,
  },
  {
    text: "Privacy Policy",
    url: "/privacy-policy",
    isExternal: false,
  },
  {
    text: "Terms of Service",
    url: "/terms-of-service",
    isExternal: false,
  },
];

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        color: "#fff",
        py: { xs: 8, md: 12 },
        width: "100%",
        mt: "auto",
        overflow: "hidden",
        letterSpacing: 0.2,
      }}
    >
      {/* Background with dynamic gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(120deg, #0a2540 0%, #003399 100%)",
          zIndex: -2,
        }}
      />

      {/* Animated background elements */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "30%",
          height: "50%",
          background:
            "radial-gradient(circle, rgba(0, 198, 251, 0.2) 0%, rgba(0, 91, 234, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          zIndex: -1,
        }}
      />

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(circle, rgba(0, 91, 234, 0.3) 0%, rgba(0, 198, 251, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          zIndex: -1,
        }}
      />

      {/* Top wave decoration */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='rgba(255, 255, 255, 0.05)'%3E%3C/path%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* Newsletter Section */}
        <GlassCard
          sx={{
            mb: 8,
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
            <GradientText variant="h4" sx={{ mb: 2 }}>
              Stay Updated
            </GradientText>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}
            >
              Subscribe to our newsletter for the latest updates on interest
              rates, special offers, and financial insights.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubscribe}
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <FloatingInput
              fullWidth
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              disabled={subscribed}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                  </InputAdornment>
                ),
              }}
            />
            <FloatingButton
              type="submit"
              variant="contained"
              disabled={subscribed}
              startIcon={subscribed ? <VerifiedIcon /> : <SendIcon />}
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </FloatingButton>
          </Box>
        </GlassCard>

        <Grid container spacing={6}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Box sx={{ mb: 3 }}>
                <GradientText
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    letterSpacing: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src="/logo.svg"
                    alt="FinTech Finance"
                    sx={{
                      height: 40,
                      mr: 1,
                      filter: "drop-shadow(0 0 10px rgba(0, 198, 251, 0.5))",
                    }}
                  />
                  FinTech Finance
                </GradientText>
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}
                >
                  Trusted partner for professional and business loans.
                  Empowering your financial journey with transparency, speed,
                  and reliability.
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                {socialLinks.map((social, idx) => (
                  <Tooltip
                    title={social.url.split("/").pop().split(".")[0]}
                    key={idx}
                    arrow
                  >
                    <ModernIconButton
                      component={motion.a}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 0 20px ${social.color}40`,
                      }}
                      href={social.url}
                      target="_blank"
                      rel="noopener"
                      aria-label={social.url.split("/").pop()}
                      sx={{ color: "#fff" }}
                    >
                      {social.icon}
                    </ModernIconButton>
                  </Tooltip>
                ))}
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 3,
                  p: 2,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <VerifiedIcon sx={{ mr: 1, color: "#00c6fb" }} />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  RBI Registered NBFC (CIN: ABCDEFGHIJKLMNO)
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <GradientText
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  borderBottom: "2px solid rgba(255,255,255,0.1)",
                  pb: 1,
                }}
              >
                Quick Links
              </GradientText>
              <Stack spacing={2.5}>
                {quickLinks.map((link, idx) => (
                  <GlowingLink
                    key={idx}
                    component={Link}
                    to={link.path}
                    onClick={handleNavigation}
                    underline="none"
                    sx={{ display: "block" }}
                  >
                    {link.name}
                  </GlowingLink>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GradientText
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  borderBottom: "2px solid rgba(255,255,255,0.1)",
                  pb: 1,
                }}
              >
                Resources
              </GradientText>
              <Stack spacing={2.5}>
                {resourceLinks.map((link, idx) => (
                  <GlowingLink
                    key={idx}
                    component={Link}
                    to={link.url}
                    onClick={handleNavigation}
                    underline="none"
                  >
                    {link.text}
                  </GlowingLink>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <GradientText
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  borderBottom: "2px solid rgba(255,255,255,0.1)",
                  pb: 1,
                }}
              >
                Contact Info
              </GradientText>

              <Stack spacing={3}>
                {infoItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      component={MuiLink}
                      href={item.link}
                      sx={{ textDecoration: "none" }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "rgba(255,255,255,0.05)",
                          color: "#00c6fb",
                          width: 40,
                          height: 40,
                        }}
                      >
                        {item.icon}
                      </Avatar>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        {item.text}
                      </Typography>
                    </Stack>
                  </motion.div>
                ))}
              </Stack>

              <Box
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                sx={{
                  mt: 4,
                  p: 2,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(90deg, #00c6fb 0%, #005bea 100%)",
                    borderRadius: 100,
                    px: 3,
                    py: 1,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 10px 20px rgba(0, 198, 251, 0.3)",
                    "&:hover": {
                      boxShadow: "0 15px 30px rgba(0, 198, 251, 0.5)",
                    },
                  }}
                  component={Link}
                  to="/contact"
                >
                  Get in Touch
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider
          sx={{
            mt: 8,
            mb: 4,
            borderColor: "rgba(255,255,255,0.1)",
            "&::before, &::after": {
              borderColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <Box
            component={motion.div}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)",
              boxShadow: "0 0 20px rgba(0, 198, 251, 0.5)",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#fff" }}>
              FF
            </Typography>
          </Box>
        </Divider>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            © {new Date().getFullYear()} FinTech Finance Ltd. All rights
            reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            <GlowingLink
              component={Link}
              to="/accessibility"
              underline="none"
              sx={{ fontSize: "0.9rem" }}
            >
              Accessibility
            </GlowingLink>
            <GlowingLink
              component={Link}
              to="/cookies"
              underline="none"
              sx={{ fontSize: "0.9rem" }}
            >
              Cookies
            </GlowingLink>
            <GlowingLink
              component={Link}
              to="/sitemap"
              underline="none"
              sx={{ fontSize: "0.9rem" }}
            >
              Sitemap
            </GlowingLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
