import dotenv from 'dotenv';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import "@/global/globals.css"
import { client } from '@/_api/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  dotenv.config();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;