import type {Metadata} from 'next';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import {ThemeProvider} from '@mui/material/styles';

import AppProvider from '@/lib/AppProvider';
import theme from '@/theme';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Shoe shop',
  description: 'Solvd final project - shoe shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/icons/logo.svg" sizes="any" />
      <body>
        <AppProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </AppProvider>
      </body>
    </html>
  );
}
