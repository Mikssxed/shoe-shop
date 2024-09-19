'use client';

import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {SessionProvider} from 'next-auth/react';
import {SnackbarProvider} from 'notistack';
import {PropsWithChildren} from 'react';

import {queryClient} from '@/tools';

export default function AppProvider({children}: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          preventDuplicate
          dense
          autoHideDuration={3000}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
          {children} <ReactQueryDevtools />
        </SnackbarProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
