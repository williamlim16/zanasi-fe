import '../styles/globals.css';
import type {  AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import HeaderFooterLayout from '../src/components/layout/HeaderFooterLayout';

function MyApp ({ Component, pageProps  }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HeaderFooterLayout >
        <Component {...pageProps} />
      </HeaderFooterLayout>
    </QueryClientProvider>
  );
}
export default MyApp;
