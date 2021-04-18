import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { DefaultLayout } from '@/components/layout';

import './globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LOG</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/Pacifico-Regular.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
