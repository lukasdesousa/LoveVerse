import { extendTheme as joyExtendTheme } from "@mui/joy/styles";
import { createTheme } from "@mui/material/styles";

// 🎨 Tema do Material UI
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
});

// 🎨 Tema do Joy UI
export const joyLightTheme = joyExtendTheme({
  colorSchemes: {
    light: {
      palette: {
        
        primary: {
          solidBg: "#1976d2",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: "#90caf9",
        },
      },
    },
  },
});

export const joyDarkTheme = joyExtendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          solidBg: "#90caf9",
        },
      },
    },
  },
});
