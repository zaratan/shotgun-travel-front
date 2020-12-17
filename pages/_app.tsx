/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/GlobalStyle.scss';
import 'tailwindcss/tailwind.css';

const WrappedApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

function MyApp(appProps: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <WrappedApp {...appProps} />
    </>
  );
}

export default MyApp;
