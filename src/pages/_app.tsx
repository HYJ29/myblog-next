import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { DefaultLayout } from '@/components/layout';

import './globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Head>
        <title>LOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
