import React, { useEffect, useContext, createContext, useReducer } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import Amplify, { API, Storage, Auth, Hub } from 'aws-amplify';

import config from '../aws-exports';

import './globals.scss';

Amplify.configure({
  ...config,
  ssr: true,
});

const authReduceer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { user: action.payload, isAuthenticated: true };

    case 'SIGN_OUT':
      return { user: null, isAuthenticated: false };

    default:
      throw Error('No matching type');
  }
};

export const AuthContext = createContext({});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authState, dispatch] = useReducer(authReduceer, {
    user: null,
    isAuthenticated: false,
  });

  const listenAuthHandler = ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        dispatch({ type: 'SIGN_IN', payload: data });
        break;
      case 'signOut':
        dispatch({ type: 'SIGN_OUT' });
        break;
      case 'customOAuthState':
        console.log(`customOAuthState data`, data);
        router.push('/user/register');
        break;
    }
  };

  useEffect(() => {
    Hub.listen('auth', listenAuthHandler);

    Auth.currentAuthenticatedUser()
      .then((user) => dispatch({ type: 'SIGN_IN', payload: user }))
      .catch((e) => dispatch({ type: 'SIGN_OUT' }));

    return () => {
      Hub.remove('auth', listenAuthHandler);
    };
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ authState, dispatch }}>
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
      </AuthContext.Provider>
    </>
  );
}

export default MyApp;
