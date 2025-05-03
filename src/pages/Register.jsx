import {
  AccountCircle,
  AdminPanelSettings,
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SavingsIcon from "@mui/icons-material/Savings";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:8732/api/users/register",
        formData
      );
      toast.success(response.data?.message || "Registration successful");

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "stretch",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0e7ff 0%, #c3cfe2 100%)",
        py: 0,
        px: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left Welcome Panel */}
      <Box
        sx={{
          flex: 1,
          minWidth: isMobile ? "100%" : 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: isMobile
            ? "transparent"
            : "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
          color: "white",
          p: isMobile ? 4 : 8,
          position: "relative",
        }}
      >
        {!isMobile && (
          <ArrowForward sx={{ fontSize: 60, mb: 2, color: "white" }} />
        )}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ mb: 2, mt: isMobile ? 2 : 0 }}
        >
          Welcome!
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: "rgba(255,255,255,0.9)" }}>
          Sign up to join our community and unlock your personalized dashboard
        </Typography>
        <Box
          component="ul"
          sx={{ pl: 3, mb: 4, color: "rgba(255,255,255,0.95)" }}
        >
          <Box
            component="li"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <CheckCircle sx={{ mr: 1, color: "#00e676" }} />
            Track your progress
          </Box>
          <Box
            component="li"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <CheckCircle sx={{ mr: 1, color: "#00e676" }} />
            Access exclusive content
          </Box>
          <Box component="li" sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircle sx={{ mr: 1, color: "#00e676" }} />
            Manage your account
          </Box>
        </Box>
      </Box>

      {/* Right Signup Form Panel */}
      <Box
        sx={{
          flex: 1,
          minWidth: isMobile ? "100%" : 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: isMobile ? "transparent" : "rgba(255,255,255,0.15)",
        }}
      >
        {/* Decorative SVG/Icons background */}
        <MonetizationOnIcon
          sx={{
            position: "absolute",
            top: { xs: 10, md: 40 },
            left: { xs: 10, md: 60 },
            fontSize: { xs: 80, md: 120 },
            color: "#0047AB",
            opacity: 0.08,
            zIndex: 0,
          }}
        />
        <SavingsIcon
          sx={{
            position: "absolute",
            bottom: { xs: 30, md: 60 },
            right: { xs: 20, md: 80 },
            fontSize: { xs: 70, md: 110 },
            color: "#009E60",
            opacity: 0.09,
            zIndex: 0,
          }}
        />
        <PersonAddAlt1Icon
          sx={{
            position: "absolute",
            top: { xs: 120, md: 180 },
            right: { xs: 10, md: 60 },
            fontSize: { xs: 60, md: 100 },
            color: "#0047AB",
            opacity: 0.07,
            zIndex: 0,
          }}
        />
        {/* End Decorative background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ zIndex: 1, width: "100%" }}
        >
          <Box
            sx={{
              backdropFilter: "blur(16px)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
              p: { xs: 3, sm: 5 },
              width: "100%",
              maxWidth: "500px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              mx: "auto",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #4361ee, #3a0ca3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    mb: 2,
                  }}
                >
                  <Lock sx={{ fontSize: 40 }} />
                </Box>
              </motion.div>

              <Typography
                variant="h4"
                fontWeight="600"
                sx={{
                  background: "linear-gradient(45deg, #4361ee, #3a0ca3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Create Account
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Join our community today
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  required
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  required
                />

                <TextField
                  fullWidth
                  select
                  label="Account Type"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {formData.role === "ADMIN" ? (
                          <AdminPanelSettings color="primary" />
                        ) : (
                          <AccountCircle color="primary" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                >
                  <MenuItem value="USER">Standard User</MenuItem>
                  {/* <MenuItem value="ADMIN">Administrator</MenuItem> */}
                </TextField>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: "12px",
                      background: "linear-gradient(45deg, #4361ee, #3a0ca3)",
                      fontSize: "1rem",
                      fontWeight: "600",
                      textTransform: "none",
                      boxShadow: "none",
                    }}
                  >
                    Register Now
                  </Button>
                </motion.div>

                <Divider sx={{ my: 2 }}>or</Divider>

                <Typography variant="body2" textAlign="center">
                  Already have an account?{" "}
                  <Button
                    onClick={() => navigate("/login")}
                    sx={{
                      textTransform: "none",
                      fontWeight: "600",
                      color: "#4361ee",
                    }}
                  >
                    Sign In
                  </Button>
                </Typography>
              </Stack>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

export default Register;
