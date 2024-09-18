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

export const stylingConstants = {
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
};
