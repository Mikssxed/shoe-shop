import { Inter } from 'next/font/google';

export const inter = Inter({
  weight: ['400', '500'],
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
  fallback: ['system-ui', 'arial'],
});

export const stylingConstants = {
  typography: {
    fontWeightLight: 300,
    fontWeightBold: 600,
  },
  palette: {
    primary: { main: '#fe645e', secondary: '#F7635E1A' },
    error: { main: '#fe645e' },
    text: {
      primary: '#000',
      secondary: '#5c5c5c',
    },
    background: {
      default: '#fff',
    },
    grey: {
      100: '#eaecf0',
      200: '#98a2b3',
      300: '#F9FAFB',
      400: '#797979',
      500: '#6E7378',
      700: '#494949',
      800: '#8C9196',
    },
  },
};
