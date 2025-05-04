// src/components/EligibilitySection.jsx
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

// Modern Styled Card Component
const ModernCard = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background:
    theme.palette.mode === "dark"
      ? "rgba(19, 47, 76, 0.85)"
      : "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(10px)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 10px 40px rgba(0, 0, 0, 0.3)"
      : "0 10px 40px rgba(0, 94, 184, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 220,
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  border:
    theme.palette.mode === "dark"
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(255, 255, 255, 0.18)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)"
        : "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
    zIndex: -1,
  },
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 20px 50px rgba(0, 0, 0, 0.4)"
        : "0 20px 50px rgba(0, 94, 184, 0.15)",
  },
}));

// Modern Icon Container
const IconContainer = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #e3f0ff 0%, #ffffff 100%)",
  boxShadow: "0 10px 25px rgba(0, 94, 184, 0.15)",
  marginBottom: theme.spacing(3),
  transition: "all 0.3s ease",
  "& svg": {
    fontSize: "2.5rem",
    transition: "all 0.3s ease",
    background: "linear-gradient(45deg, #1976d2 0%, #2196f3 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
}));

// Tooltip Styled Component
const ModernTooltip = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  bottom: -80,
  left: 0,
  width: "100%",
  padding: theme.spacing(2),
  background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
  color: "#fff",
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  fontWeight: 500,
  fontSize: "0.9rem",
  transition: "all 0.3s ease",
  zIndex: 2,
}));

const eligibility = [
  {
    icon: <BusinessCenterIcon />,
    text: "Professional Background",
    tip: "Applicant must be a salaried professional and must provide a valid salary slip and PF account statement.",
  },
  {
    icon: <AssignmentIndIcon />,
    text: "Age 21 to 65 years",
    tip: "Applicant should be within the specified age range at loan maturity.",
  },
 
  {
    icon: <CreditScoreIcon />,
    text: "Good Credit Score",
    tip: "A healthy credit score (usually 600+) is required for approval.",
  },

  {
    icon: <VerifiedUserIcon />,
    text: "Indian Citizenship",
    tip: "Applicant must be an Indian citizen with valid KYC documents.",
  },
];

export default function EligibilitySection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #f8fafc 0%, #e3f0ff 100%)",
        position: "relative",
        overflow: "hidden",
        my: 8,
        borderRadius: { xs: 0, md: 5 },
      }}
    >
      {/* Background Shapes */}
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(33, 150, 243, 0.05) 0%, rgba(33, 150, 243, 0) 70%)",
          top: "-200px",
          right: "-200px",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0) 70%)",
          bottom: "-100px",
          left: "-100px",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              background: "linear-gradient(45deg, #1976d2 0%, #2196f3 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2rem", md: "2.75rem" },
            }}
          >
            Professional Loan Eligibility
          </Typography>

          <Box
            sx={{
              width: "120px",
              height: "4px",
              background: "linear-gradient(90deg, #1976d2, #64b5f6)",
              margin: "0 auto",
              borderRadius: "2px",
              mb: 4,
            }}
          />

          <Typography
            align="center"
            sx={{
              color: "#4f5b7c",
              mb: 8,
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            To qualify for a professional loan, applicants must meet the
            following criteria. These requirements ensure you get the financial
            support your business deserves.
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4} justifyContent="center">
            {eligibility.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: idx * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <ModernCard
                    whileHover={{
                      y: isMobile ? 0 : -10,
                    }}
                  >
                    <IconContainer>{item.icon}</IconContainer>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#1976d2",
                        textAlign: "center",
                        mb: 2,
                      }}
                    >
                      {item.text}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "text.secondary",
                        textAlign: "center",
                        fontSize: "0.95rem",
                      }}
                    >
                      {item.tip}
                    </Typography>
                  </ModernCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
