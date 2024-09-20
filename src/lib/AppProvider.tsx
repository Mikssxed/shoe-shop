'use client';

import { PropsWithChildren, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';

import { queryClient } from '@/tools';
//TODO: probably we can delete Suspense when we delete /DummyPage
export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            maxSnack={3}
            dense
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            {children} <ReactQueryDevtools />
          </SnackbarProvider>
        </QueryClientProvider>
      </SessionProvider>
    </Suspense>
  );
}
