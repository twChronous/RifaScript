import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from './_api/apollo';
import dotenv from 'dotenv';
import "./global/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  dotenv.config();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;