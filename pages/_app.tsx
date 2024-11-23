import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { extendTheme } from '@chakra-ui/react';

const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    heading: `'Space Grotesk', sans-serif`,
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
