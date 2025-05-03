import { createTheme } from "@mui/material/styles";

// Common theme settings
const commonSettings = {
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 24px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "light",
    primary: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00C6FB",
      light: "#4DD8FF",
      dark: "#0095C8",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#666666",
    },
    error: {
      main: "#FF4D4F",
      light: "#FF7875",
      dark: "#D9363E",
    },
    warning: {
      main: "#FAAD14",
      light: "#FFC53D",
      dark: "#D48806",
    },
    success: {
      main: "#52C41A",
      light: "#73D13D",
      dark: "#389E0D",
    },
    info: {
      main: "#1890FF",
      light: "#40A9FF",
      dark: "#096DD9",
    },
    divider: "rgba(0, 0, 0, 0.06)",
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "dark",
    primary: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00C6FB",
      light: "#4DD8FF",
      dark: "#0095C8",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#0A1929",
      paper: "#132F4C",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    error: {
      main: "#FF4D4F",
      light: "#FF7875",
      dark: "#D9363E",
    },
    warning: {
      main: "#FAAD14",
      light: "#FFC53D",
      dark: "#D48806",
    },
    success: {
      main: "#52C41A",
      light: "#73D13D",
      dark: "#389E0D",
    },
    info: {
      main: "#1890FF",
      light: "#40A9FF",
      dark: "#096DD9",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  components: {
    ...commonSettings.components,
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#132F4C",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#132F4C",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0A1929",
          backgroundImage: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0A1929",
          backgroundImage: "none",
        },
      },
    },
  },
});

// Default export for backward compatibility
export default lightTheme;
