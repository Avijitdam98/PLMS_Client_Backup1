import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion as Motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(13, 17, 23, 0.95)'
    : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 30px rgba(0, 0, 0, 0.3)'
    : '0 4px 30px rgba(0, 0, 0, 0.1)',
  borderBottom: theme.palette.mode === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : '1px solid rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active
    ? theme.palette.mode === 'dark' ? '#4CAF50' : '#2E7D32'
    : theme.palette.text.primary,
  fontWeight: 600,
  fontSize: '0.95rem',
  padding: '8px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  background: active
    ? theme.palette.mode === 'dark'
      ? 'rgba(76, 175, 80, 0.1)'
      : 'rgba(46, 125, 50, 0.08)'
    : 'transparent',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(76, 175, 80, 0.15)'
      : 'rgba(46, 125, 50, 0.12)',
    transform: 'translateY(-2px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: active ? '100%' : '0%',
    height: '2px',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, #4CAF50, #81C784)'
      : 'linear-gradient(90deg, #2E7D32, #4CAF50)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateX(-50%)',
    borderRadius: '2px',
  },
}));

const SignInButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)'
    : 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
  border: 0,
  borderRadius: '8px',
  color: 'white',
  padding: '8px 24px',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 12px rgba(76, 175, 80, 0.3)'
      : '0 4px 12px rgba(46, 125, 50, 0.2)',
    '&::before': {
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const LogoutButton = styled(Button)(() => ({
  background: "linear-gradient(45deg, #dc3545 30%, #ff4d4d 90%)",
  border: 0,
  borderRadius: "8px",
  color: "white",
  padding: "8px 24px",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(220, 53, 69, 0.2)",
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #4CAF50, #81C784)'
    : 'linear-gradient(45deg, #2E7D32, #4CAF50)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  fontSize: '1.5rem',
  cursor: 'pointer',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: '100%',
    height: '2px',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, #4CAF50, #81C784)'
      : 'linear-gradient(90deg, #2E7D32, #4CAF50)',
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.3s ease',
  },
  '&:hover': {
    transform: 'scale(1.05)',
    '&::after': {
      transform: 'scaleX(1)',
      transformOrigin: 'left',
    },
  },
  transition: 'all 0.3s ease',
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  border: `2px solid ${theme.palette.mode === 'dark' ? '#4CAF50' : '#2E7D32'}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 0 15px rgba(76, 175, 80, 0.4)'
      : '0 0 15px rgba(46, 125, 50, 0.3)',
  },
}));

const getUserInitials = (user) => {
  if (!user || !user.name) return "U";
  return user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setIsAuthenticated(user.id != null && user.role);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const getNavItems = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const items = [{ title: "Home", path: "/", icon: <HomeRoundedIcon /> }];

    if (isAuthenticated) {
      items.push(
        {
          title: "Dashboard",
          path: user.role === "ADMIN" ? "/admin-dashboard" : "/dashboard",
          icon: <DashboardRoundedIcon />,
        },
        {
          title: "Credit Score",
          path: "/credit-score",
          icon: <CreditScoreRoundedIcon />,
        }
      );
      if (user.role === "USER") {
        items.push(
          // {
          //   title: "Document Hub",
          //   path: "/documents",
          //   icon: <PictureAsPdf />,
          // },
          {
            title: "Apply Loan",
            path: "/apply-loan",
            icon: <AccountBalanceRoundedIcon />,
          }
        );
      }
    }
    return items;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", px: 2, mb: 2 }}
      >
        <Logo>FinTechProLoan</Logo>
        <IconButton onClick={handleDrawerToggle}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <List>
        {getNavItems().map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              mb: 1,
              borderRadius: 2,
              mx: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 45, 98, 0.05)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "#002D62" : "#666",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              sx={{
                color: location.pathname === item.path ? "#002D62" : "#666",
                "& .MuiListItemText-primary": {
                  fontWeight: location.pathname === item.path ? 600 : 400,
                },
              }}
            />
          </ListItem>
        ))}
        {!isAuthenticated && (
          <>
            <ListItem
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              sx={{
                mb: 1,
                borderRadius: 2,
                mx: 1,
                background: "linear-gradient(45deg, #002D62 30%, #F9B233 90%)",
                color: "white",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <LoginRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Login"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                }}
              />
            </ListItem>
            <ListItem
              component={Link}
              to="/register"
              onClick={handleDrawerToggle}
              sx={{
                mb: 1,
                borderRadius: 2,
                mx: 1,
                border: "2px solid #002D62",
                "&:hover": {
                  backgroundColor: "rgba(0, 45, 98, 0.05)",
                },
              }}
            >
              <ListItemIcon>
                <PersonAddRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Register"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                }}
              />
            </ListItem>
          </>
        )}
      </List>
      {isAuthenticated && (
        <Box sx={{ p: 2, mt: "auto" }}>
          <LogoutButton
            fullWidth
            onClick={() => {
              handleLogout();
              handleDrawerToggle();
            }}
            startIcon={<LogoutRoundedIcon />}
          >
            Logout
          </LogoutButton>
        </Box>
      )}
    </Box>
  );

  return (
    <Motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledAppBar
        position="sticky"
        elevation={scrolled ? 4 : 0}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                component={Link}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 56,
                  mr: 3,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)',
                  '&:hover': {
                    transform: 'scale(1.10)',
                    boxShadow: '0 6px 32px 0 rgba(0, 198, 251, 0.25)',
                  },
                }}
              >
                <Box
                  component="img"
                  src="/logo.svg"
                  alt="FinTech Finance"
                  sx={{ height: 56, filter: 'drop-shadow(0 2px 12px rgba(0, 198, 251, 0.18))' }}
                />
              </Box>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {getNavItems().map((item) => (
                <NavButton
                  key={item.title}
                  component={Link}
                  to={item.path}
                  active={location.pathname === item.path}
                  startIcon={item.icon}
                >
                  {item.title}
                </NavButton>
              ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {isAuthenticated ? (
                <>
                  <IconButton
                    onClick={handleProfileClick}
                    sx={{
                      p: 0,
                      border: "2px solid",
                      borderColor: "primary.main",
                    }}
                  >
                    <UserAvatar
                      sx={{
                        bgcolor: theme.palette.mode === 'dark' ? '#4CAF50' : '#2E7D32',
                        color: 'white',
                        width: 40,
                        height: 40,
                      }}
                    >
                      {getUserInitials(JSON.parse(localStorage.getItem('user')))}
                    </UserAvatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileClose}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleProfileClose}
                    >
                      <ListItemIcon>
                        <PersonAddRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    startIcon={<LoginRoundedIcon />}
                    sx={{
                      color: "text.primary",
                      display: { xs: "none", sm: "flex" },
                    }}
                  >
                    Login
                  </Button>
                  <SignInButton
                    component={Link}
                    to="/register"
                    startIcon={<PersonAddRoundedIcon />}
                  >
                    Sign Up
                  </SignInButton>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Motion.div>
  );
};

export default Navbar;
