import { createTheme } from "@mui/material/styles";

const primaryColor = "#ffa726";
const secondaryColor = "#5284AA";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: primaryColor,
              contrastText: "#ffffff",
            },
            secondary: {
              main: secondaryColor,
              contrastText: "#ffffff",
            },
            error: {
              main: "#e53935",
              contrastText: "#ffffff",
            },
            warning: {
              main: "#ffb300",
              contrastText: "#000000",
            },
            info: {
              main: "#29b6f6",
              contrastText: "#ffffff",
            },
            success: {
              main: "#66bb6a",
              contrastText: "#ffffff",
            },
            background: {
              default: "#fffefc",
              paper: "#ffffff",
            },
            text: {
              primary: "#212121",
              secondary: "#424242",
            },
          }
        : {
            primary: { main: primaryColor },
            secondary: { main: "#6FB0E6", contrastText: "#ffffff" },
            background: { default: "#121212", paper: "#1e1e1e" },
          }),
    },

    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },

    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            // Default border color
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: primaryColor,
            },
            // Hover state
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: primaryColor,
            },
            // Focused state
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: primaryColor,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: primaryColor,
            "&.Mui-focused": {
              color: "#ffa726",
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 3,
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "0.75rem",
          },
        },
      },
    },
  });
