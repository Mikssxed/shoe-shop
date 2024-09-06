"use client";
import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Inter, Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  weight: ["300", "400", "500", "600"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
});

export const inter = Inter({
  weight: ["400", "500"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
});

let theme = createTheme();

theme = createTheme({
  typography: {
    fontFamily: workSans.style.fontFamily,
    fontWeightLight: 300,
    fontWeightBold: 600,

    allVariants: {
      fontWeight: 500,
    },

    h1: {
      fontSize: 45,
    },
    h2: {
      fontSize: 25,
    },
    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 18,
    },

    body1: {
      fontSize: 15,
      color: "#5c5c5c",
    },
    body2: {
      fontSize: 12,
      color: "#5c5c5c",
    },
  },
  palette: {
    primary: { main: "#fe645e" },
    error: { main: "#fe645e" },
    text: {
      primary: "#000",
      secondary: "#5c5c5c",
    },
    background: {
      default: "#fff",
    },
    grey: {
      100: "#eaecf0",
      200: "#98a2b3",
      300: "#F9FAFB",
      400: "#797979",
      500: "#6E7378",
      700: "#494949",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "12px",
          "&:hover": { backgroundColor: theme.palette.grey[100] },
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: theme.palette.grey[300],
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: 11,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[300],
            border: "2px solid transparent",
            backgroundClip: "padding-box",
            borderRadius: 10,
            transition: "background-color 0.3s ease-in-out",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: theme.palette.grey[400],
            },
        },
      }),
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.spacing(),
          padding: ["7px", "16px"].join(" "),
        }),

        input: () => ({
          fontSize: 15,
          fontWeight: 400,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: () => ({
          fontSize: 15,
          color: "text.secondary",
          marginBottom: "5px",
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          whiteSpace: "nowrap",
          boxShadow: "none",
          borderRadius: theme.spacing(),
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: ({ theme }) => ({
          color: theme.palette.common.white,
          border: `1px solid ${theme.palette.primary.main}`,
          "&:hover": {
            color: theme.palette.primary.main,
            backgroundColor: "transparent",
          },
        }),
        outlined: ({ theme }) => ({
          border: `1px solid ${theme.palette.primary.main}`,
          "&:hover": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderWidth: 1,
          borderColor: theme.palette.grey[100],
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderWidth: 1,
          borderRadius: 2,
          borderColor: theme.palette.grey[700],
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: () => ({
          padding: 0,
          border: "none",

          "&.Mui-focused": {
            borderColor: `${theme.palette.grey[700]}`,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",

            borderColor: `${theme.palette.grey[700]}`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: () => ({
          backgroundColor: theme.palette.grey[300],
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: () => ({
          height: "60px",
          [theme.breakpoints.up("md")]: {
            height: "120px",
          },
        }),
      },
    },
  },
});

theme = createTheme(theme, {
  palette: {
    backdrop: theme.palette.augmentColor({
      color: {
        main: alpha("#F3F3F3", 0.9),
      },
      name: "backdrop",
    }),
  },
});

theme = responsiveFontSizes(theme);

export default theme;
