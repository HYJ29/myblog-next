import React, { useEffect, useContext, createContext, useReducer } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import produce from 'immer';

import Head from 'next/head';
import Amplify, { API, Storage, Auth, Hub, withSSRContext } from 'aws-amplify';

import { userByProviderKey } from '@/graphql/queries';

import config from '../aws-exports';
import './globals.scss';

Amplify.configure({
  ...config,
  ssr: true,
});

const INITIAL_AUTH_STATE = {
  user: null,
  auth: null,
  isAuthenticated: false,
  isSignIned: false,
};

const authReduceer = produce((draft, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      draft.auth = action.payload;
      draft.isAuthenticated = true;
      break;
    case 'USER_SIGN_IN':
      draft.user = action.payload;
      draft.isSignIned = true;
      break;
    case 'SIGN_OUT':
      return INITIAL_AUTH_STATE;

    default:
      // throw Error('No matching type');
      return;
  }
}, INITIAL_AUTH_STATE);

export const AuthContext = createContext({});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authState, dispatch] = useReducer(authReduceer, INITIAL_AUTH_STATE);

  const listenAuthHandler = async ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        dispatch({ type: 'AUTHENTICATE', payload: data });
        break;
      case 'signOut':
        dispatch({ type: 'SIGN_OUT' });
        break;
      case 'customOAuthState':
        try {
          const cognitoUser = await Auth.currentAuthenticatedUser();
          await userSignIn(cognitoUser);
        } catch (e) {
          console.log(`e`, e);
        }
        break;
    }
  };

  const userSignIn = async (cognitoUser) => {
    const providerKey = cognitoUser.username;
    const userOfProviderKey = await API.graphql({
      query: userByProviderKey,
      variables: { providerKey },
    });

    const dbUser = userOfProviderKey.data.userByProviderKey.items[0] ?? null;

    if (dbUser) {
      dispatch({ type: 'USER_SIGN_IN', payload: dbUser });
      console.log(`dbUser`, dbUser);
    } else {
      router.push('/user/register');
    }
  };

  useEffect(() => {
    Hub.listen('auth', listenAuthHandler);

    Auth.currentAuthenticatedUser()
      .then((cognitoUser) => {
        dispatch({ type: 'AUTHENTICATE', payload: cognitoUser });
        return cognitoUser;
      })
      .then((cognitoUser) => {
        userSignIn(cognitoUser);
      })
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
